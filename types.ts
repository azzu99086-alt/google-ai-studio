
export enum CalculatorMode {
  STANDARD = 'STANDARD',
  SCIENTIFIC = 'SCIENTIFIC',
  GRAPHING = 'GRAPHING',
  SMART = 'SMART'
}

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface GraphDataPoint {
  x: number;
  y: number;
}
