
export enum Page {
  Landing = 'LANDING',
  Travel = 'TRAVEL',
  Final = 'FINAL'
}

export interface Destination {
  name: string;
  flag: string;
  x: number; // percentage across map
  y: number; // percentage down map
}

export const DESTINATIONS: Destination[] = [
  { name: 'Santorini', flag: '🇬🇷', x: 20, y: 30 },
  { name: 'Maldives', flag: '🇲🇻', x: 50, y: 60 },
  { name: 'Dubai', flag: '🇦🇪', x: 80, y: 40 }
];
