import * as bcrypt from 'bcrypt';

export namespace Password {

  export function hash(data: string): Promise<string> {
    return bcrypt.hash(data, 10)
  }

  export function compare(data: string, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted)
  }

}