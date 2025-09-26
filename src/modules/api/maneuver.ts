import { buildErrorFromResponse } from './api-errors';

export interface PercentManeuverResult {
  percent: number;
  critical: string | undefined;
  message: string;
}

export interface AbsoluteManeuverResult {
  result: string;
  message: string;
  penaltyUntilAbsoluteSuccess?: number;
  bonusUntilAbsoluteFailure?: number;
}

export interface EnduranceManeuverResult {
  result: string;
  message: string;
  fatigue: number;
  hitPoints: number;
  bonus: number;
}

export interface ManeuverDifficulty {
  id: string;
  modifier: number;
}

export const MANEUVER_DIFFICULTIES: ManeuverDifficulty[] = [
  { id: 'c', modifier: 70 },
  { id: 's', modifier: 50 },
  { id: 'r', modifier: 30 },
  { id: 'e', modifier: 20 },
  { id: 'l', modifier: 10 },
  { id: 'm', modifier: 0 },
  { id: 'h', modifier: -10 },
  { id: 'vh', modifier: -20 },
  { id: 'xh', modifier: -30 },
  { id: 'sf', modifier: -50 },
  { id: 'a', modifier: -70 },
  { id: 'ni', modifier: -100 },
];

export async function fetchPercentManeuver(roll: number): Promise<PercentManeuverResult> {
  const url = `${process.env.RMU_API_CORE_URL}/maneuvers/percent?roll=${roll}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchAbsoluteManeuver(
  roll: number,
  table: string | undefined,
  unusualEvent: boolean | undefined
): Promise<AbsoluteManeuverResult> {
  let query = `?roll=${roll}`;
  if (table) {
    query += `&table=${table}`;
  }
  if (unusualEvent) {
    query += `&unusualEvent=${unusualEvent}`;
  }
  const url = `${process.env.RMU_API_CORE_URL}/maneuvers/absolute${query}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchEnduranceManeuver(
  roll: number,
  unusualEvent: boolean | undefined
): Promise<EnduranceManeuverResult> {
  let query = `?roll=${roll}`;
  if (unusualEvent) {
    query += `&unusualEvent=${unusualEvent}`;
  }
  const url = `${process.env.RMU_API_CORE_URL}/maneuvers/endurance${query}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}
