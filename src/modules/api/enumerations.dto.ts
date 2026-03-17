import { AccessType } from './common.dto';

export interface Enumeration {
  id: string;
  name: string;
  category: string;
  realmId: string | null;
  accessType: AccessType;
}

export type CreateEnumerationDto = Omit<Enumeration, 'id'>;

export type UpdateEnumerationDto = Partial<Omit<Enumeration, 'id'>>;
