export type Realm = {
  id: string;
  name: string;
  description: string | undefined;
};

export type CreateRealmDto = Omit<Realm, 'id'>;

export type UpdateRealmDto = Partial<Omit<Realm, 'id'>>;
