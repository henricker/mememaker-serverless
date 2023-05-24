export type IErrorParams = {
  stack?: string
  className?: string
  lambdaName?: string
  message?: string
  statusCode?: number
}

export class IError extends Error {
  stackTrace?: string
  className?: string
  lambdaName?: string
  statusCode?: number

  constructor({
    className,
    lambdaName,
    message,
    stack,
    statusCode,
  }: IErrorParams) {
    super(message)
    this.stackTrace = stack
    this.className = className
    this.lambdaName = lambdaName
    this.statusCode = statusCode || 400
  }
}
