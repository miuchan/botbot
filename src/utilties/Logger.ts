import * as debug from 'debug';

if (!process.env['DEBUG']) {
  if (process.env['NODE_ENV'] !== 'production') {
    debug.enable("shuzhai:*")
  } else {
    debug.enable("shuzhai:*,-shuzhai:*:debug")
  }
} else {
  debug.enable(process.env['DEBUG'])
}

export class LoggerInstance {
  private debugInfo: any
  private debugDebug: any
  private debugError: any

  constructor(private name: string = "shuzhai") {
    this.debugInfo = debug(`${name}:info`)
    this.debugDebug = debug(`${name}:debug`)
    this.debugError = debug(`${name}:error`)
  }

  child(name: string): LoggerInstance {
    return new LoggerInstance((this.name ? `${this.name}:` : "") + name);
  }

  log(...args: any[]) {
    this.debugDebug(...args);
  }

  debug(...args: any[]) {
    this.debugDebug(...args);
  }

  info(...args: any[]) {
    this.debugInfo(...args);
  }

  error(error: Error, ...args: any[]) {
    this.debugError(...args, error.stack)
  }

  panic(error: Error, ...args: any[]) {
    this.error(error, ...args)
    process.exit(1)
  }
}

export let Logger = new LoggerInstance()