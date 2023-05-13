#ifndef __SENSOR_COMMANDS__
#define __SENSOR_COMMANDS__

#include "log.h"
#include "param.h"
#include "pm.h"
#include "crtp_commander_high_level.h"
#include "math.h"

/**
 * @brief Retreive the absolute x position of the drone (initial position is 0)
 * 
 * @return the x coordinate
 */
float getXPosition();

/**
 * @brief Retreive the absolute y position of the drone (initial position is 0)
 * 
 * @return the y coordinate
 */
float getYPosition();

/**
 * @brief Retreive the absolute z position of the drone (initial position is 0)
 * 
 * @return the z coordinate
 */
float getZPosition();

/**
 * @brief Retreive the left distance to the closest object
 * 
 * @return the distance to the left
 */
float getLeftDistance();

/**
 * @brief Retreive the right distance to the closest object
 * 
 * @return the distance to the right
 */
float getRightDistance();

/**
 * @brief Retreive the front distance to the closest object
 * 
 * @return the distance to the front
 */
float getFrontDistance();

/**
 * @brief Retreive the back distance to the closest object
 * 
 * @return the distance to the back
 */
float getBackDistance();

/**
 * @brief Retreive the upward distance to the closest object
 * 
 * @return the distance to the roof
 */
float getUpDistance();

/**
 * @brief Retreive the downward distance to the closest object
 * 
 * @return the distance to the ground
 */
float getDownDistance();

/**
 * @brief Retreive the battery voltage of the drone
 * 
 * @return the battery voltage
 */
float getBattery();

/**
 * @brief Retreive the power of the link between the Crazyradio PA and the drone
 * 
 * @return the RSSI value
 */
float getRSSI();

/**
 * @brief Retreive the speed of the drone
 * 
 * @return the speed value
 */
float getSpeed();

#endif /* __SENSOR_COMMANDS__ */