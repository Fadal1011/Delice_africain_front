import { Plat } from "../../plat/interfaces/plat"

export interface Menu extends Plat{
  id: number
  nom: string
  date: string
  plats: Plat[]
}


