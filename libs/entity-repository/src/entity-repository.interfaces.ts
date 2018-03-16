export interface EntityRepositoryModuleConfig {
  storeNamespace: string;
}

export interface SingleEntityRepository<T> {
  [id: string]: T;
}

export interface EntityRepositoryState<T> {
  [entity: string]: SingleEntityRepository<T>;
}

export interface EntityRepositoryStateRoot {
  entityRepository: EntityRepositoryState<any>;
}
