export type Realm = {
  id: string;
  name: string;
  shortDescription: string | undefined;
  description: string | undefined;
};

export type CreateRealmDto = Omit<Realm, 'id'>;

export type UpdateRealmDto = Partial<Omit<Realm, 'id'>>;
