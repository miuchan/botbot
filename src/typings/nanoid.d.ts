declare module "nanoid/format" {
  /**
   * Secure random string generator with custom alphabet.
   *
   * Alphabet must contain 256 symbols or less. Otherwise, the generator
   * will not be secure.
   *
   * @param {random} random The random bytess generator.
   * @param {string} alphabet Symbols to be used in new random string.
   * @param {size} size The number of symbols in new random string.
   *
   * @return {string} Random string.
   *
   * @example
   * var format = require('nanoid/format')
   *
   * function random (size) {
   *   var result = []
   *   for (var i = 0; i < size; i++) result.push(randomByte())
   *   return result
   * }
   *
   * format(random, "abcdef", 5) //=> "fbaef"
   *
   * @name format
   */
  function format(random: (len: number) => number[] | Uint8Array, alphabet: string, size: number): string;
  module format { }
  export = format;
}