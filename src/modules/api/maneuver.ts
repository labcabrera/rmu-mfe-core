import { buildErrorFromResponse } from './api-errors';

export interface PercentManeuverResult {
  percent: number;
  critical: string | undefined;
  message: string;
}

export interface AbsoluteManeuverResult {
  result: string;
  message: string;
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
  const url = `${process.env.RMU_API_CORE_URL}/maneuvers/percent/${roll}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}

export async function fetchAbsoluteManeuver(roll: number): Promise<AbsoluteManeuverResult> {
  const url = `${process.env.RMU_API_CORE_URL}/maneuvers/absolute/${roll}`;
  const response = await fetch(url, { method: 'GET' });
  if (response.status !== 200) {
    throw await buildErrorFromResponse(response, url);
  }
  return await response.json();
}
