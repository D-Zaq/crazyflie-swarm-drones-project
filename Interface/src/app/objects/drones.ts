export interface Drone {
    name: string;
    speed: number;
    battery: number;
    ledOn: boolean;
    real?: boolean;
}

export const DRONE_1: Drone = {
    name: 'Drone 1',
    speed: 0,
    battery: 100,
    ledOn: false,
};

export const DRONE_2: Drone = {
    name: 'Drone 2',
    speed: 0,
    battery: 100,
    ledOn: false,
};