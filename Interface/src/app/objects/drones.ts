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
    speed: number;
    battery: number;
    ledOn: boolean;
    real?: boolean;
}


export const DRONE_1: Drone = {
    identifier: "Drone 1",
    name: "radio://0/80/2M/E7E7E7E731",
    speed: 0,
    battery: 100,
    ledOn: false,
};

export const DRONE_2: Drone = {
    identifier: "Drone 2",
    name: "radio://0/80/2M/E7E7E7E732",
    speed: 0,
    battery: 100,
    ledOn: false,
};