import { injectable } from 'inversify'
import { ValidationError } from 'class-validator'
import { validationError } from '@business/errors/validationErrors'
import { AbstractSerializer } from '../serializers/abstractSerializer'

@injectable()
export abstract class AbstractOperator<I, O> {
  abstract run(input: I): Promise<O>

  protected exec(input: AbstractSerializer<I>): void {
    try {
      input?.validate()
    } catch (error) {
      if (
        error instanceof Array &&
        error.length &&
        error[0] instanceof ValidationError
      ) {
        const validationErrors = error as ValidationError[]

        const details = validationErrors.map((error) => ({
          property: error.property,
          value: error.value,
          errors: Object.entries(error.constraints).map(([, value]) => value),
        }))

        throw validationError(details)
      }
    }
  }
}
