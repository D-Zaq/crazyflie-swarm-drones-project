import { MAX_REAL_RANGE, MAX_SIM_RANGE } from "../constants/constants";

export interface IDrone {

    name: string;
    speed: number;
    battery: number;
    ledOn: boolean;
    _id?: number;
    real?: boolean;
    updatedAt?: Date;
    createdAt?: Date;
    lastUpdatedBy?: string;
}

export interface Drone {
    id: any,
    name: string;
    speed: string;
    battery: string;
    xPosition: any;
    yPosition: any;
    zPosition: any;
    angle: any;
    frontDistance: any;
    backDistance: any;
    leftDistance: any;
    rightDistance: any;
    state: string;
}

export interface MapDrone {
    name: string;
    xPosition: any;
    yPosition: any;
    angle: string;
    frontDistance: any;
    backDistance: any;
    leftDistance: any;
    rightDistance: any;
    state?: any;
    id?: any;
}
// export interface ArgosDrone {
//     id: string,
//     name: string;
//     speed: string;
//     battery: string;
//     position: [string,string,string];
//     yaw: string;
//     ledOn: boolean;
//     real?: boolean;
// }


export const DRONE_1: Drone = {
    id: 0,
    name: "radio://0/80/2M/E7E7E7E731",
    speed: '0',
    battery: '0',
    xPosition: 0,
    yPosition: 0,
    zPosition: 0,
    angle: '0',
    frontDistance: MAX_REAL_RANGE,
    backDistance: MAX_REAL_RANGE,
    leftDistance: MAX_REAL_RANGE,
    rightDistance: MAX_REAL_RANGE,
    state: 'Disconnected',
};

export const DRONE_2: Drone = {
    id: 1,
    name: "radio://0/80/2M/E7E7E7E732",
    speed: '0',
    battery: '0',
    xPosition: 0,
    yPosition: 0,
    zPosition: 0,
    angle: '0',
    frontDistance: MAX_REAL_RANGE,
    backDistance: MAX_REAL_RANGE,
    leftDistance: MAX_REAL_RANGE,
    rightDistance: MAX_REAL_RANGE,
    state: 'Disconnected',
};

export const MAP_DRONE_1: MapDrone = {
    name: "radio://0/80/2M/E7E7E7E731",
    xPosition: 0,
    yPosition: 0,
    angle: '0',
    frontDistance: MAX_REAL_RANGE,
    backDistance: MAX_REAL_RANGE,
    leftDistance: MAX_REAL_RANGE,
    rightDistance: MAX_REAL_RANGE,
    id: 0,
};

export const MAP_DRONE_2: MapDrone = {
    name: "radio://0/80/2M/E7E7E7E732",
    xPosition: 0,
    yPosition: 0,
    angle: '0',
    frontDistance: MAX_REAL_RANGE,
    backDistance: MAX_REAL_RANGE,
    leftDistance: MAX_REAL_RANGE,
    rightDistance: MAX_REAL_RANGE,
    id: 1,
};

export const SIM_DRONE_1: Drone = {
    id: "",
    name: "Sim_Drone_0",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};

export const SIM_DRONE_2: Drone = {
    id: "",
    name: "Sim_Drone_1",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};

export const SIM_DRONE_3: Drone = {
    id: "",
    name: "Sim_Drone_2",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};

export const SIM_DRONE_4: Drone = {
    id: "",
    name: "Sim_Drone_3",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};
export const SIM_DRONE_5: Drone = {
    id: "",
    name: "Sim_Drone_4",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};
export const SIM_DRONE_6: Drone = {
    id: "",
    name: "Sim_Drone_5",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};
export const SIM_DRONE_7: Drone = {
    id: "",
    name: "Sim_Drone_6",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};
export const SIM_DRONE_8: Drone = {
    id: "",
    name: "Sim_Drone_7",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: MAX_SIM_RANGE,
    backDistance: MAX_SIM_RANGE,
    leftDistance: MAX_SIM_RANGE,
    rightDistance: MAX_SIM_RANGE,
    state: 'disconnected',
};

export const SIM_DRONE_9: Drone = {
    id: "",
    name: "Sim_Drone_8",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: '2',
    backDistance: '2',
    leftDistance: '2',
    rightDistance: '2',
    state: 'disconnected',
};

export const SIM_DRONE_10: Drone = {
    id: "",
    name: "Sim_Drone_9",
    speed: '0',
    battery: '100',
    xPosition: 0,
    yPosition: 0,
    zPosition: '0',
    angle: '0',
    frontDistance: '2',
    backDistance: '2',
    leftDistance: '2',
    rightDistance: '2',
    state: 'disconnected',
};

export enum Command
{
    Identify = "i",
    StartMission = "s",
    Land = "c",
    Fly = "e",
    Base = "b"
}

export interface CommandStruct {
    droneURI: string;
    command: Command | string;
}
