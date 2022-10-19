import { IBaseCountry } from './country'
import { IBaseUser } from './user'

export interface IProfile extends Omit<IBaseUser, 'role'> {
  gender?: 'F' | 'M' | 'NC'
  job: string
}

export interface IProfile extends Omit<IBaseCountry, 'role'> {
  appCountry?: 'y' | 'n' | 'idn'
  job: string
}
