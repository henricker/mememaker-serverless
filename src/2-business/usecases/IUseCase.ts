export interface IUseCase<I, O> {
  exec(props: I): Promise<O>
}
