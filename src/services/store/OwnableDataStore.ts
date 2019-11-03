
export default interface OwnableDataStore<T> {
  fetchAll (ownerId: string): Promise<T[]>;
  save (model: T, ownerId: string): Promise<T>;
  get (modelId: string, ownerId: string): Promise<T>;
  remove (modelId: string, ownerId: string): Promise<T>;
}
