export interface BaseRepository<T, CreateInput = Partial<T>, UpdateInput = Partial<T>> {
  findById(id: number): Promise<T | null>;

  create(data: CreateInput): Promise<T>;

  update(id: number, data: UpdateInput): Promise<T>;

  delete(id: number): Promise<T>;

  findAll(): Promise<T[]>;
}
