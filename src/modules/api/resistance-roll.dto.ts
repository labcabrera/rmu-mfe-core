export interface KeyValue {
  key: string;
  value: number;
}
export interface ResistanceRollQuery {
  attackLevel: number;
  targetLevel: number;
  roll: number;
  modifiers: KeyValue[] | undefined;
}

export interface ResistanceRollResult {
  result: string;
  modifiers: KeyValue[];
  totalRoll: number;
  failure: number;
}
