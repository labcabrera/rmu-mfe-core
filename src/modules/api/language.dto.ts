import { NamedEntity } from './common.dto';

export type Language = {
  id: string;
  name: string;
  realm: NamedEntity;
  realmName: string;
  description: string | undefined;
};

export type CreateLanguageDto = {
  id: string;
  name: string;
  realmId: string;
  description: string | undefined;
};

export type UpdateLanguageDto = Partial<Omit<Language, 'id' | 'realm' | 'realmName'>>;
