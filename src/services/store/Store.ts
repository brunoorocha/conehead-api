
export default interface Store<T> {
  fetchAll (): Promise<T[]>;
  save (model: T): Promise<T>;
  get (modelId: string): Promise<T>;
  remove (modelId: string): Promise<T>;
}
