export type Realm = {
  id: string;
  name: string;
  description: string | undefined;
};

export type CreateRealmDto = {
  name: string;
  description: string | undefined;
};

export type UpdateRealmDto = {
  name: string | undefined;
  description: string | undefined;
};
