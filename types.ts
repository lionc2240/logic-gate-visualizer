
export type GateType = 'AND' | 'OR' | 'NOT' | 'XOR' | 'NAND' | 'NOR' | 'XNOR';

export interface TruthTableRow {
  inputs: boolean[];
  output: boolean;
}

export interface GateDefinition {
  name: string;
  description: string;
  type: GateType;
  logic: (inputs: boolean[]) => boolean;
  inputCount: number;
  truthTable: TruthTableRow[];
  svgPath: string;
}
