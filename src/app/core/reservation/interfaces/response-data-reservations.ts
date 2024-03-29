import { ResponData } from "src/app/shared/interfaces/respon-data";
import { Reservation } from "./reservation";

export interface ResponseDataReservations extends ResponData<Reservation>{
  links:Links[]
}


export interface Links {
  url:string,
  label:string,
  active:boolean
}
