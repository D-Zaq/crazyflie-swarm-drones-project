#include "../interface/MissionCommands.h"
#include <stdio.h>
#include <stdlib.h>
#include "app_channel.h"
#include "sitaw.h"

/* Declaration of global variables*/
static enum CfDir m_cDir = FRONT;
static enum CfDir previousDir = INIT;
static int step = 0;
static int totalsSteps = 0;
static float minimalRangeDist = 0.5f;
static float travelDistance = 0.05f;
struct movement_t {
    float x;
    float y;
};

struct movement_t* movementsHistory;

bool allocateMovementsHistory(){
    movementsHistory = (struct movement_t*)malloc(300*sizeof(struct movement_t));
    return movementsHistory == NULL ? false : true;
}

void deallocateMovementsHistory(){
    free(movementsHistory);
}

enum CfDir bestDirection(struct RangingDeckReadings readings)
{
    enum CfDir maxDir = FRONT;
    float maxDist = readings.frontDistance;
    if (readings.backDistance > maxDist)
    {
        maxDir = BACK;
        maxDist = readings.backDistance;
    }
    if (readings.leftDistance > maxDist)
    {
        maxDir = LEFT;
        maxDist = readings.leftDistance;
    }
    if (readings.rightDistance > maxDist)
    {
        maxDir = RIGHT;
        maxDist = readings.rightDistance;
    }
    return maxDir;
}

void land(){
    struct responsePacketTX responsePacket;
    responsePacket.responseState = LANDING;
    appchannelSendPacket(&responsePacket, sizeof(responsePacket));
    lowerDrone(0.0f);
    totalsSteps = 0;
    step = 0;
    m_cDir = FRONT;
    deallocateMovementsHistory();
};

void identify() {
    ledSetAll();
    vTaskDelay(M2T(1000));
    ledClearAll();
    vTaskDelay(M2T(1000));
    ledSetAll();
    vTaskDelay(M2T(1000));
    ledClearAll();
    vTaskDelay(M2T(1000));
    ledSetAll();
    ledClearAll();
}

void goForward(float distance){
    crtpCommanderHighLevelGoTo(distance, 0.0f, 0.0f, 0.0f, 0.5f, true);
    vTaskDelay(M2T(500));
    struct movement_t movement = {distance, 0.0f};
    movementsHistory[totalsSteps] = movement;
}

void goBackwards(float distance){
    crtpCommanderHighLevelGoTo((-1.0f * distance), 0.0f, 0.0f, 0.0f, 0.5f, true);
    vTaskDelay(M2T(500));
    struct movement_t movement = {(-1.0f * distance), 0.0f};
    movementsHistory[totalsSteps] = movement;
}

void goLeft(float distance){
    crtpCommanderHighLevelGoTo(0.0f, distance, 0.0f, 0.0f, 0.5f, true);
    vTaskDelay(M2T(500));
    struct movement_t movement = {0.0f, distance};
    movementsHistory[totalsSteps] = movement;
}

void goRight(float distance){
    crtpCommanderHighLevelGoTo(0.0f, (-1.0f * distance), 0.0f, 0.0f, 0.5f, true);
    vTaskDelay(M2T(500));
    struct movement_t movement = {0.0f, (-1.0f * distance)};
    movementsHistory[totalsSteps] = movement;
}

void stayInPlace(){
    crtpCommanderHighLevelGoTo(0.0f, 0.0f, 0.0f, 0.0f, 1.0, true);
    vTaskDelay(M2T(2000));
}

void elevateDrone(float height){
    crtpCommanderHighLevelTakeoff(height,5.0f);
    vTaskDelay(M2T(5000));
}

void lowerDrone(float height){
    crtpCommanderHighLevelLand(height, 1.5f);
}

void selectMovingDirection() {
    switch (m_cDir) {
        case FRONT : goForward(travelDistance);break;
        case LEFT  : goLeft(travelDistance);break;
        case BACK  : goBackwards(travelDistance);break;
        case RIGHT : goRight(travelDistance);break;
        default: break;
    }
    step++;
    totalsSteps++;
}

void avoidObstacles(struct RangingDeckReadings readings){
    enum CfDir bestDir = bestDirection(readings);
    if (readings.frontDistance > minimalRangeDist && readings.backDistance > minimalRangeDist && readings.rightDistance > minimalRangeDist && readings.leftDistance > minimalRangeDist){
        return; // nothing to do (no obstacle)
    }else if (readings.frontDistance < minimalRangeDist && m_cDir == FRONT){      
        if(readings.leftDistance > minimalRangeDist){
            m_cDir = LEFT;
        }else if(readings.rightDistance > minimalRangeDist){
            m_cDir = RIGHT;
        }else if(readings.backDistance > minimalRangeDist){
            m_cDir = BACK;
        }else{
            m_cDir = bestDir;
        }
        previousDir = FRONT;
        step = 0;
    }else if (readings.backDistance < minimalRangeDist && m_cDir == BACK){
        if(readings.leftDistance > minimalRangeDist){
            m_cDir = LEFT;
        }else if(readings.rightDistance > minimalRangeDist){
            m_cDir = RIGHT;
        }else if(readings.frontDistance > minimalRangeDist){
            m_cDir = FRONT;
        }else{
            m_cDir = bestDir;
        }
        previousDir = BACK;
        step = 0;
    }else if (readings.rightDistance < minimalRangeDist && m_cDir == RIGHT){
        if(readings.frontDistance > minimalRangeDist){
            m_cDir = FRONT;
        }else if(readings.backDistance > minimalRangeDist){
            m_cDir = BACK;
        }else if(readings.leftDistance > minimalRangeDist){
            m_cDir = LEFT;
        }else{
            m_cDir = bestDir;
        }
        previousDir = RIGHT;
        step = 0;
    }else if (readings.leftDistance < minimalRangeDist && m_cDir == LEFT){
        if(readings.frontDistance > minimalRangeDist){
            m_cDir = FRONT;
        }else if(readings.backDistance > minimalRangeDist){
            m_cDir = BACK;
        }else if(readings.rightDistance > minimalRangeDist){
            m_cDir = RIGHT;
        }else{
            m_cDir = bestDir;
        }
        previousDir = LEFT;
        step = 0;
    }
    selectMovingDirection();
}

void explore(){
    struct responsePacketTX responsePacket;
    struct RangingDeckReadings readings;
    readings.frontDistance = getFrontDistance();
    readings.backDistance = getBackDistance();
    readings.leftDistance = getLeftDistance();
    readings.rightDistance = getRightDistance();
    avoidObstacles(readings);

    responsePacket.responseState = EXPLORATION;
    appchannelSendPacket(&responsePacket, sizeof(responsePacket));

    /* Move the drone in the direction m_cDir */
    selectMovingDirection(); 

    // Changes direction every 50 steps.
    if (step % 50 == 0) {
        readings.frontDistance = getFrontDistance();
        readings.backDistance = getBackDistance();
        readings.leftDistance = getLeftDistance();
        readings.rightDistance = getRightDistance();
        if (bestDirection(readings) != previousDir) {
            previousDir = m_cDir;
            m_cDir = bestDirection(readings);
        }else{
            previousDir = m_cDir;
        }
    }
    if (supervisorIsTumbled()) {
        responsePacket.responseState = CRASHED;
        appchannelSendPacket(&responsePacket, sizeof(responsePacket));
        deallocateMovementsHistory();
    }
};

bool goToBase() {
    struct responsePacketTX responsePacket;
    responsePacket.responseState = RETOUR_BASE;
    appchannelSendPacket(&responsePacket, sizeof(responsePacket));
    if(movementsHistory==NULL || movementsHistory[0].x != 0.05f){
        land();
        vTaskDelay(M2T(1000));
        return false;
    }
    for(int i=totalsSteps-1; i>=0; i--){
        crtpCommanderHighLevelGoTo(-1.0f * (movementsHistory[i].x), -1.0f * (movementsHistory[i].y), 0.0f, 0.0f, 0.5f, true);
        vTaskDelay(M2T(500));
        float currentX = getXPosition();
        float currentY = getYPosition();
        if(currentX < 0.2f && currentY < 0.2f){
            break;
        }
    }
    land();
    return true;
    
}
