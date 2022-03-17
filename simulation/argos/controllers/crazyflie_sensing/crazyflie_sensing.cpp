#include <stdio.h>
#include <iostream>
#include <cstdio>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#define PORT 8080

/* Include the controller definition */
#include "crazyflie_sensing.h"
/* Function definitions for XML parsing */
#include <argos3/core/utility/configuration/argos_configuration.h>
/* 2D vector definition */
#include <argos3/core/utility/math/vector2.h>
/* Logging */
#include <argos3/core/utility/logging/argos_log.h>

/****************************************/
/****************************************/

CCrazyflieSensing::CCrazyflieSensing() :
   m_pcDistance(NULL),
   m_pcPropellers(NULL),
   m_pcRNG(NULL),
   m_pcRABA(NULL),
   m_pcRABS(NULL),
   m_pcPos(NULL),
   m_pcBattery(NULL),
   m_uiCurrentStep(0) {}

   int sock_ = 0;
   bool flying = false;

/****************************************/
/****************************************/

void CCrazyflieSensing::Init(TConfigurationNode& t_node) {
   try {
      /*
       * Initialize sensors/actuators
       */
      m_pcDistance   = GetSensor  <CCI_CrazyflieDistanceScannerSensor>("crazyflie_distance_scanner");
      m_pcPropellers = GetActuator  <CCI_QuadRotorPositionActuator>("quadrotor_position");
      /* Get pointers to devices */
      m_pcRABA   = GetActuator<CCI_RangeAndBearingActuator>("range_and_bearing");
      m_pcRABS   = GetSensor  <CCI_RangeAndBearingSensor  >("range_and_bearing");
      try {
         m_pcPos = GetSensor  <CCI_PositioningSensor>("positioning");
      }
      catch(CARGoSException& ex) {}
      try {
         m_pcBattery = GetSensor<CCI_BatterySensor>("battery");
      }
      catch(CARGoSException& ex) {}      
   }
   catch(CARGoSException& ex) {
      THROW_ARGOSEXCEPTION_NESTED("Error initializing the crazyflie sensing controller for robot \"" << GetId() << "\"", ex);
   }
   /*
    * Initialize other stuff
    */
   /* Create a random number generator. We use the 'argos' category so
      that creation, reset, seeding and cleanup are managed by ARGoS. */
   m_pcRNG = CRandom::CreateRNG("argos");

   m_uiCurrentStep = 0;
   this->sock = connectServer();
   Reset();
}

int CCrazyflieSensing::connectServer(){
   int sock = 0;
    struct sockaddr_in serv_addr;
    
    if ((sock = socket(AF_INET, SOCK_STREAM, 0)) < 0)
    {
        printf("\n Socket creation error \n");
        return -1;
    }
   
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);
       
    // Convert IPv4 and IPv6 addresses from text to binary form
    if(inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr)<=0) 
    {
        printf("\nInvalid address/ Address not supported \n");
        return -1;
    }
   
    if (connect(sock, (struct sockaddr *)&serv_addr, sizeof(serv_addr)) < 0)
    {
        printf("\nConnection Failed \n");
        return -1;
    }

    return sock;
}

char CCrazyflieSensing::readBuffer(){
   int valread = 0;
   char buffer[1024] = {0};
   int currentCommand = 0;
   char command;


   valread = recv(this->sock , buffer, 1024, MSG_PEEK);
   for(int i = 0; i < valread; i++){
        if((int)buffer[i] != 4){
            command = buffer[i];
        }
    }
   return command;
}

void CCrazyflieSensing::CheckState(){
   char command = readBuffer();

   switch (command){
      case 's':
         this->state = 1;
         break;
      case 'c':
         this->state = 3;
         break;
      default:
         break;
   }
}


/****************************************
LOOP
****************************************/

void CCrazyflieSensing::ControlStep() {
   //TODO: Different states
   // For now: 
   // 'e' = empty, 's' = start aka takeoff, 'c' = stop aka land

   CheckState();

   switch(this->state){
      case 1:
         if(!this->flying){
            TakeOff();
            this->flying = true;
            this->firstTime = true;
            m_cInitialPosition = m_pcPos->GetReading().Position;
         }
         if(((m_pcPos->GetReading().Position).GetZ()) > 0.8){
            this->state = 2;
         }
      case 2:
         if(this->state == 2){
            Explore();
         }
         break;
      case 3:
         if(this->flying){
            Land();
            this->flying = false;
         }
         break;

   }

   // Print current position.
   LOG << "Position (x,y,z) = (" << m_pcPos->GetReading().Position.GetX() << ","
       << m_pcPos->GetReading().Position.GetY() << ","
       << m_pcPos->GetReading().Position.GetZ() << ")" << std::endl
       << m_uiCurrentStep << std::endl;

   // Print current battery level
   const CCI_BatterySensor::SReading& sBatRead = m_pcBattery->GetReading();
   LOG << "Battery level: " << sBatRead.AvailableCharge  << std::endl;

   // Look here for documentation on the distance sensor: /root/argos3/src/plugins/robots/crazyflie/control_interface/ci_crazyflie_distance_scanner_sensor.h
   // Read and print distance sensor measurements
   CCI_CrazyflieDistanceScannerSensor::TReadingsMap sDistRead = 
      m_pcDistance->GetReadingsMap();
   auto iterDistRead = sDistRead.begin();
   if (sDistRead.size() == 4) {
      LOG << "Front dist: " << (iterDistRead++)->second  << std::endl;
      LOG << "Left dist: "  << (iterDistRead++)->second  << std::endl;
      LOG << "Back dist: "  << (iterDistRead++)->second  << std::endl;
      LOG << "Right dist: " << (iterDistRead)->second  << std::endl;
   }

   // Increase step counter

}

/****************************************/
/****************************************/

void CCrazyflieSensing::Explore(){
   //CVector3 cPos = m_pcPos->GetReading().Position;
   CCI_CrazyflieDistanceScannerSensor::TReadingsMap sDistRead = 
      m_pcDistance->GetReadingsMap();
   auto iterDistRead = sDistRead.begin();
   auto front = (iterDistRead++)->second;
   auto left = (iterDistRead++)->second;
   auto back = (iterDistRead++)->second;
   auto right = (iterDistRead)->second;

   front = (front == -2) ? 500 : front;
   left = (left == -2) ? 500 : left;
   back = (back == -2) ? 500 : back;
   right = (right == -2) ? 500 : right;

   CVector3 trans(0.0f, 0.0f, 0.0f);
   
   // if(this->firstTime){
   //    trans.SetX(5.0f);
   //    m_pcPropellers->SetAbsolutePosition(m_cInitialPosition + trans);
   //    this->firstTime = false;
   // }
   
   if (left < 100){
      if (left < 100 && left > 90){
         lastPositionL = m_pcPos->GetReading().Position;;
      }
      
      trans.SetX(-0.3f);
      trans.SetY(-1.0f);
      //trans.SetZ(2.0f);
      float z = ((lastPositionL.GetX()+lastPositionL.GetY()) == 0) ? 2.0 : lastPositionL.GetZ();
      trans.SetZ(z);
      CVector3 move = lastPositionL + trans;
      m_pcPropellers->SetAbsolutePosition(move);
      LOGERR << "Target Left: " << move << std::endl;

   }

   if(front < 100){
      if (front < 100 && front > 90){
         lastPositionF = m_pcPos->GetReading().Position;;
      }
      trans.SetY(0.3f);
      trans.SetX(-1.0f);
      //trans.SetZ(2.0f);
      float z = ((lastPositionF.GetX()+lastPositionF.GetY()) == 0) ? 2.0 : lastPositionF.GetZ();
      trans.SetZ(z);
      CVector3 move = lastPositionF + trans;
      m_pcPropellers->SetAbsolutePosition(move);
      LOGERR << "Target Front: " << move << std::endl;
   }

   if(right < 100){
      if (right < 100 && right > 90){
         lastPositionR = m_pcPos->GetReading().Position;;
      }
      trans.SetX(0.3f);
      trans.SetY(1.0f);
      //trans.SetZ(2.0f);
      float z = ((lastPositionR.GetX()+lastPositionR.GetY()) == 0) ? 2.0 : lastPositionR.GetZ();
      trans.SetZ(z);
      CVector3 move = lastPositionR + trans;
      m_pcPropellers->SetAbsolutePosition(move);
      LOGERR << "Target Right: " << move << std::endl;
   }

   if(back < 100){
      if (back < 100 && back > 95){
         lastPositionB = m_pcPos->GetReading().Position;;
      }
      trans.SetX(1.0f);
      trans.SetY(-1.3f);
      //trans.SetZ(2.0f);
      float z = ((lastPositionB.GetX()+lastPositionB.GetY()) == 0) ? 2.0 : lastPositionB.GetZ();
      trans.SetZ(z);
      CVector3 move = lastPositionB + trans;
      m_pcPropellers->SetAbsolutePosition(move);
      LOGERR << "Target back: " << move << std::endl;
   }

   if((front > 100) && (left > 100) && (back > 100) && (right > 100)){
      int transValueX = Randomize();
      int transValueY = Randomize();

      // LOGERR << "Random value X: " << transValueX << std::endl;
      // LOGERR << "Random value Y: " << transValueY << std::endl;

      CVector3 cPos = m_pcPos->GetReading().Position;
      trans.SetX((static_cast<float>(transValueX)/2.0));
      trans.SetY((static_cast<float>(transValueY)/2.0));
      //trans.SetX(-1.0f);
      //trans.SetY(-1.0f);
      m_pcPropellers->SetAbsolutePosition(cPos + trans);
      
   }
}

/****************************************/
/****************************************/

int CCrazyflieSensing::Randomize(){
   int value = 0;
   srand(time(NULL));
   int number = rand() % 10 + 1;
   if((number % 2) == 0){
      value = 1;
   }
   else{
      value = -1;
   }
   return value;
}

/****************************************/
/****************************************/

bool CCrazyflieSensing::TakeOff() {
   CVector3 cPos = m_pcPos->GetReading().Position;
   LOGERR << "Take off coords: " << cPos << std::endl;
   if(Abs(cPos.GetZ() - 2.0f) < 0.01f) return false;
   cPos.SetZ(2.0f);
   m_pcPropellers->SetAbsolutePosition(cPos);
   return true;
}

/****************************************/
/****************************************/

bool CCrazyflieSensing::Land() {
   CVector3 cPos = m_pcPos->GetReading().Position;
   if(Abs(cPos.GetZ()) < 0.01f) return false;
   cPos.SetZ(0.0f);
   m_pcPropellers->SetAbsolutePosition(cPos);
   LOGERR << "CPOS: " << cPos << std::endl;
   return true;
}

/****************************************/
/****************************************/

void CCrazyflieSensing::Reset() {
}

/****************************************/
/****************************************/

/*
 * This statement notifies ARGoS of the existence of the controller.
 * It binds the class passed as first argument to the string passed as
 * second argument.
 * The string is then usable in the XML configuration file to refer to
 * this controller.
 * When ARGoS reads that string in the XML file, it knows which controller
 * class to instantiate.
 * See also the XML configuration files for an example of how this is used.
 */
REGISTER_CONTROLLER(CCrazyflieSensing, "crazyflie_sensing_controller")
