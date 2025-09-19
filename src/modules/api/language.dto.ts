export type Language = {
  id: string;
  name: string;
  realmId: string;
  realmName: string;
  description: string | undefined;
};

export type CreateLanguageDto = Omit<Language, 'id' | 'realmName'>;

export type UpdateLanguageDto = Partial<Omit<Language, 'id' | 'realmId' | 'realmName'>>;
