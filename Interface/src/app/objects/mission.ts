import { MapDrone } from "./drones";
import { Vec2 } from "./vec2";

export interface Mission {
    id: number;
    drones: MapDrone[];
    allPoints: Vec2[];
    dronesPoints?: any;
    type: string;
    date: string;
    nDrones?: number;
    travelTime?: any;
  }

//   export interface MissionTest {
//     id: number;
//     drones: MapDrone[];
//     allPoints: Vec2[];
//     dronesPoints: Vec2[][];
//     type: string;
//     date: string;
//   }