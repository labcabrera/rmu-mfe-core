import { mergeJsonHeaders } from '../services/auth-token-service';
import { apiCoreUrl } from '../services/config';
import { buildErrorFromResponse } from './api-errors';
import { ResistanceRollQuery, ResistanceRollResult } from './resistance-roll.dto';

export async function resistanceRoll(dto: ResistanceRollQuery): Promise<ResistanceRollResult> {
  const url = `${apiCoreUrl}/resistance-rolls`;
  const response = await fetch(url, {
    method: 'POST',
    headers: mergeJsonHeaders(),
    body: JSON.stringify(dto),
  });
  if (response.status !== 201) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}
