/**
 * ,---------,       ____  _ __
 * |  ,-^-,  |      / __ )(_) /_______________ _____  ___
 * | (  O  ) |     / __  / / __/ ___/ ___/ __ `/_  / / _ \
 * | / ,--´  |    / /_/ / / /_/ /__/ /  / /_/ / / /_/  __/
 *    +------`   /_____/_/\__/\___/_/   \__,_/ /___/\___/
 *
 * Crazyflie control firmware
 *
 * Copyright (C) 2019 Bitcraze AB
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, in version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 *
 * appchanel_test.c: Demonstrate the appchanel functionality
 */
#include <float.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <led.h>

#include "app.h"
#include "app_channel.h"
#include "crtp_commander_high_level.h"
#include "debug.h"
#include "pm.h"

#include "../Interface/MissionCommands.h"
#include "../Interface/SensorCommands.h"

#define DEBUG_MODULE "HELLOWORLD"
#define VBAT_30 3.75f

void appMain()
{
  char state = 'd';
  struct commandPacketRX commandPacket;
  struct responsePacketTX responsePacket;

  paramVarId_t paramIdCommanderEnHighLevel = paramGetVarId("commander", "enHighLevel");
  paramSetInt(paramIdCommanderEnHighLevel, 1);

  ledClearAll();
  crtpCommanderHighLevelInit();


  DEBUG_PRINT("Waiting for activation ...\n");

  while(1){
		if (appchannelReceivePacket(&commandPacket, sizeof(commandPacket), 50)) {
			if (commandPacket.command != 'i' && commandPacket.command != 's' && commandPacket.command != 'c' && commandPacket.command != 'b'){
				responsePacket.responseState = ERREUR;
				appchannelSendPacket(&responsePacket, sizeof(responsePacket));
			}
			else if (commandPacket.command == 'i'){
        state = 'i';
      }
      else if (commandPacket.command == 's') {
        state = 'e';
			}
      else if (commandPacket.command == 'c') {
        // Land the drone
        state = 'l';
      }
			else if (commandPacket.command == 'b') {
				// switch to return to base state
				state = 'b';
			}
			else {
				// switch to other state
				state = 'd';
			}
		}
		switch (state){
			case 'i': {
				// Identify state
        identify();
				state = 'd';
				break;
			}
      case 'e': {
				// Exploration state
        allocateMovementsHistory();
        responsePacket.responseState = EXPLORATION;
        appchannelSendPacket(&responsePacket, sizeof(responsePacket));
        crtpCommanderHighLevelTakeoffWithVelocity(0.2f, 2.0f, true);
        vTaskDelay(M2T(1000));
        while (commandPacket.command == 's') {
          explore();
          if (appchannelReceivePacket(&commandPacket, sizeof(commandPacket), 0)) {
            if (commandPacket.command == 'c') {
              state = 'l';
            }else if (commandPacket.command == 'b') {
              state = 'r';
            }
            break;
          }
          if (getBattery() == lowPower) {
            state = 'l';
            break;
          }
        }    
				break;
			}
      case 'l': {
        // Land the drone
        land();
        vTaskDelay(M2T(1000));
        state = 'd';
        break;
      }
			case 'r': {
				// return to base state
        goToBase();
        land();
        vTaskDelay(M2T(1000));
        state = 'd';
				break;
			}
			case 'd': {
				//other state -- Do nothing
				break;
			}
		}
	}
  
}
