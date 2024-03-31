import { User } from "./user"

export interface UserLogin {
  message: string
  user: User
  token: string
}
