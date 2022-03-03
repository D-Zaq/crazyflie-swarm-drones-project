import { Time } from "@angular/common"

export interface Log {
    StartTime: string,
    EndTime: string,
    X: number,
    Y: number,
    Z: number,
    Battery: number,
    Speed: number,
    RotationAngle: number
}