import * as crypto from 'crypto';
import * as format from 'nanoid/format';

export namespace Random {
  export function binary(len: number): Buffer {
    const buffer = new Buffer(len)
    for (let i = 0; i < len; i++) {
      buffer[i] = Math.floor(Math.random() * 0x100)
    }
    return buffer
  }

  export function binaryCryptographically(len: number): Buffer {
    return crypto.randomBytes(len)
  }

  export async function binaryCryptographicallyAsync(len: number): Promise<Buffer> {
    return crypto.randomBytes(len)
  }

  export function integer(min: number = 0, max: number = 65536): number {
    return Math.floor(Math.random() * (max - min)) + min
  }

  export let patternNumber = "0123456789"
  export let patternLowercaseAlphabet = "abcdefghijklmnopqrstuvwxyz"
  export let patternUppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  export let patternAlphabet = [patternLowercaseAlphabet, patternUppercaseAlphabet].join("")
  export let patternLowercaseAlphabetNumber = [patternLowercaseAlphabet, patternNumber].join("")
  export let patternUppercaseAlphabetNumber = [patternUppercaseAlphabet, patternNumber].join("")
  export let patternAlphabetNumber = [patternAlphabet, patternNumber].join("")

  export function pattern(len: number, pattern: string = patternLowercaseAlphabetNumber): string {
    return format((len) => new Uint8Array(binary(len)), pattern, len)
  }

  export function patternCryptographically(len: number, pattern: string = patternLowercaseAlphabetNumber): string {
    return format((len) => new Uint8Array(binaryCryptographically(len)), pattern, len)
  }
}