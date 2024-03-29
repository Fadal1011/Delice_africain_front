import { Plat } from "../../plat/interfaces/plat"

export interface Reservation {
  id: number
  nombre_personnes: number
  date_reservation: string
  nom: string
  email: string
  numero_telephone: string
  prix_total: string
  statut: string
  heure_reservation:string
  plats: Plat[]
}


