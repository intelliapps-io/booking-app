import { FormComponentProps } from "antd/lib/form";

export function allowFormSubmit(fieldNames: string[], formProps: FormComponentProps["form"]) {
  const { getFieldError, isFieldTouched } = formProps;
  let allowSubmit = false;
  fieldNames.forEach(field => {
    const isTouched = isFieldTouched(field);
    if (!isTouched) allowSubmit = true;
    if (isTouched) if (getFieldError(field)) allowSubmit = true;
  });
  return allowSubmit;
}

export class Limiter {
  func: Function = () => { }
  interval: number
  lastRun: Date = new Date()
  lastCalled: Date = new Date()
  timeout: NodeJS.Timeout | undefined

  constructor(interval: number) {
    this.interval = interval
  }

  execute(func: Function) {
    this.func = func
    this.lastCalled = new Date()
    if (this.lastCalled.getTime() - this.lastRun.getTime() < this.interval) {
      this.lastRun = new Date()
      this.func()
    } else {
      if (this.timeout) clearTimeout(this.timeout)
      // @ts-ignore
      this.timeout = setTimeout(() => {
        this.lastRun = new Date()
        this.func()
      }, this.interval)
    }
  }

  isWaiting(): boolean {
    if (!this.lastRun) return false;
    const timeDiff = new Date().getTime() - this.lastRun.getTime()
    return timeDiff < this.interval;
  }
}

export function getGraphqlConnectionString() {//handle dif port for dev and production
  const { protocol, hostname } = window.location
  const port = hostname.indexOf('localhost') > -1 ? 3001 : window.location.port
  return `${protocol}//${hostname}:${port}/graphql`
}

export function validateUrlName(text: string): boolean {
  const regex = /\w+[a-z_0-9]/gm;
  const match = text.match(regex);
  if (!match) return false;
  if (text === match[0]) {
    return true;
  } else {
    return false;
  }
};