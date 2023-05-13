#include "../interface/SensorCommands.h"

float getXPosition() {
    logVarId_t logIdStateEstimateX = logGetVarId("stateEstimate", "x");
    return logGetFloat(logIdStateEstimateX);
}

float getYPosition() {
    logVarId_t logIdStateEstimateY = logGetVarId("stateEstimate", "y");
    return logGetFloat(logIdStateEstimateY);
}

float getZPosition() {
    logVarId_t logIdStateEstimateZ = logGetVarId("stateEstimate", "z");
    return logGetFloat(logIdStateEstimateZ);
}

float getLeftDistance(){
    logVarId_t idLeft = logGetVarId("range", "left");
    return((float)logGetUint(idLeft)/1000.0f);
}

float getRightDistance(){
    logVarId_t idRight = logGetVarId("range", "right");
    return((float)logGetUint(idRight)/1000.0f);
}

float getFrontDistance(){
    logVarId_t idFront = logGetVarId("range", "front");
    return((float)logGetUint(idFront)/1000.0f);
}

float getBackDistance(){
    logVarId_t idBack = logGetVarId("range", "back");
    return((float)logGetUint(idBack)/1000.0f);
}

float getUpDistance(){
    logVarId_t idUp = logGetVarId("range", "up");
    return((float)logGetUint(idUp)/1000.0f);
}

float getDownDistance(){
    logVarId_t idDown = logGetVarId("range", "down");
    return((float)logGetUint(idDown)/1000.0f);
}

float getBattery(){
    logVarId_t idbatt = logGetVarId("pm", "state");
    return(logGetFloat(idbatt));
}

float getRSSI(){
    logVarId_t idRSSI = logGetVarId("radio", "rssi");
    return(logGetFloat(idRSSI));
}

float getSpeed(){
    float speed = 0.0f;
    logVarId_t idVx = logGetVarId("stateEstimate", "vx");
    logVarId_t idVy = logGetVarId("stateEstimate", "vy");
    float vx = logGetFloat(idVx);
    float vy = logGetFloat(idVy);

    // Calculate the average speed by combining speed in x and y
    speed = sqrtf(powf(vx, 2) + powf(vy, 2));
    return speed;
}
