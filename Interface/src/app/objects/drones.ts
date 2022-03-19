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
    identifier: string,
    name: string;
    speed: string;
    battery: string;
    xPosition: string;
    yPosition: string;
    zPosition: string;
    angle: string;
    frontDistance: string;
    backDistance: string;
    leftDistance: string;
    rightDistance: string;
    state: string;
    ledOn: boolean;
    real?: boolean;
}

// export interface ArgosDrone {
//     identifier: string,
//     name: string;
//     speed: string;
//     battery: string;
//     position: [string,string,string];
//     yaw: string;
//     ledOn: boolean;
//     real?: boolean;
// }


export const DRONE_1: Drone = {
    identifier: "Drone 1",
    name: "radio://0/80/2M/E7E7E7E731",
    speed: '0',
    battery: '100',
    xPosition: '0',
    yPosition: '0',
    zPosition: '0',
    angle: '0',
    frontDistance: '2',
    backDistance: '2',
    leftDistance: '2',
    rightDistance: '2',
    state: 'Disconnected',
    ledOn: false,
};

export const DRONE_2: Drone = {
    identifier: "Drone 2",
    name: "radio://0/80/2M/E7E7E7E732",
    speed: '0',
    battery: '100',
    xPosition: '0',
    yPosition: '0',
    zPosition: '0',
    angle: '0',
    frontDistance: '2',
    backDistance: '2',
    leftDistance: '2',
    rightDistance: '2',
    state: 'Disconnected',
    ledOn: false,
};

export const SIM_DRONE_1: Drone = {
    identifier: "Sim_Drone_1",
    name: "SimDrone_1",
    speed: '0',
    battery: '100',
    xPosition: '0',
    yPosition: '0',
    zPosition: '0',
    angle: '0',
    frontDistance: '2',
    backDistance: '2',
    leftDistance: '2',
    rightDistance: '2',
    state: 'disconnected',
    ledOn: false,
};

export const SIM_DRONE_2: Drone = {
    identifier: "Sim_Drone_2",
    name: "SimDrone_2",
    speed: '0',
    battery: '100',
    xPosition: '0',
    yPosition: '0',
    zPosition: '0',
    angle: '0',
    frontDistance: '2',
    backDistance: '2',
    leftDistance: '2',
    rightDistance: '2',
    state: 'disconnected',
    ledOn: false,
};

export enum Command
{
    Identify = "i",
    StartMission = "s",
    Land = "c",
    Fly = "e"
}

export interface CommandStruct {
    droneURI: string;
    command: Command;
}
