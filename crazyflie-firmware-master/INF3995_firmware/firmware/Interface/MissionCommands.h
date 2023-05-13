#ifndef __MOVEMENTS__
#define __MOVEMENTS__

#include "crtp_commander_high_level.h"
#include "../interface/SensorCommands.h"
#include "sleepus.h"
#include <led.h>

/**
 * @brief Struct that represent the value read from the distance sensor.
 * 
 * @param frontDistance : represent the distance from the front sensor
 * @param backDistance  : represent the distance from the back sensor
 * @param leftDistance  : represent the distance from the left sensor
 * @param rightDistance : represent the distance from the right sensor
 */
struct RangingDeckReadings{
      float frontDistance;
      float backDistance;
      float leftDistance;
      float rightDistance;
};

struct commandPacketRX
{
  char command;
} __attribute__((packed));

struct responsePacketTX
{
  int responseState;
} __attribute__((packed));

enum responseState
{
  ON_THE_GROUND = 0,
  EXPLORATION = 1,
  LANDING = 2,
  CRASHED = 3,
  RETOUR_BASE = 4,
  ERREUR = 5
};

/**
 * @brief Enum that represents in which state of direction the drone is in
 */
enum CfDir {FRONT, LEFT, BACK, RIGHT, INIT};

/**
 * @brief allocate the memory for the movements history (every step)
 * 
 * @return bool : true if the allocation was successful, false otherwise
 */
bool allocateMovementsHistory();

/**
 * @brief deallocate the memory used by the movements history
 * 
 * @return void
 */
void deallocateMovementsHistory();

/**
 * @brief Take off drone
 * 
 * @return void
 */
void takeOff();

/**
 * @brief Land the drone at it's current position
 * 
 * @return void
 */
void land();

/**
 * @brief Land the drone at the base of operations
 *
 * @return bool whether the drone has landed or still returning to base
 */
bool returnToBase();

/**
 * @brief Drone starts exploring
 * 
 * @return void
 */
void exploration();

/**
 * @brief Identify the drone
 * 
 * @return void
 */
void identify();

/**
 * @brief This function makes the drone move forward.
 * @param distance  distance of movement
 * @return void
 */
void goForward(float distance);

/**
 * @brief This function makes the drone move backward.
 * @param distance  distance of movement
 * @return void
 */
void goBackwards(float distance);

/**
 * @brief This function makes the drone move left.
 * @param distance  distance of movement
 * @return void
 */
void goLeft(float distance);

/**
 * @brief This function makes the drone move right.
 * @param distance  distance of movement
 * @return void
 */
void goRight(float distance);

/**
 * @brief This function makes the drone move upward on the z axis.
 * @param height  the height that the drone will reach
 * @return void
 */
void elevateDrone(float height);

/**
 * @brief This function makes the drone move downward on the z axis.
 * @param height  the height that the drone will reach
 * @return void
 */
void lowerDrone(float height);

/**
 * @brief This function call goForward, goBackwards, goLeft or goRight depending on m_cDir.
 * @return void
 */
void selectMovingDirection();

/**
 * @brief This function makes the drone avoid obstacle according to the sensor reading.
 * @param readings  struct that represent the value read by the distance sensor
 * @return void
 */
void avoidObstacles(struct RangingDeckReadings readings);

/**
 * @brief This function makes the drone explore the environment by changing the axis of mouvement every 80 steps
 * @return void
 */
void explore();

/**
 * @brief This function makes the drone go back to it's base 
 * @return bool whether the drone has landed or still returning to base
 */
bool goToBase();

/**
 * @brief This function stabilize the drone by making it stay in place.
 * @return void
 */
void stayInPlace();

#endif
