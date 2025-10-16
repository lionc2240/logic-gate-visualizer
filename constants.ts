import { GateDefinition, GateType } from './types';

const generateTruthTable = (inputCount: number, logic: (inputs: boolean[]) => boolean) => {
  const table = [];
  const numRows = 2 ** inputCount;
  for (let i = 0; i < numRows; i++) {
    const inputs = [];
    for (let j = inputCount - 1; j >= 0; j--) {
      inputs.push(Boolean((i >> j) & 1));
    }
    table.push({ inputs, output: logic(inputs) });
  }
  return table;
};

const AND_LOGIC = (inputs: boolean[]) => inputs.every(i => i);
const OR_LOGIC = (inputs: boolean[]) => inputs.some(i => i);
const NOT_LOGIC = (inputs: boolean[]) => !inputs[0];
const XOR_LOGIC = (inputs: boolean[]) => inputs.reduce((a, b) => a !== b, false);
const NAND_LOGIC = (inputs: boolean[]) => !AND_LOGIC(inputs);
const NOR_LOGIC = (inputs: boolean[]) => !OR_LOGIC(inputs);
const XNOR_LOGIC = (inputs: boolean[]) => !XOR_LOGIC(inputs);

export const GATES: Record<GateType, GateDefinition> = {
  AND: {
    type: 'AND',
    name: 'AND Gate',
    description: 'Outputs true (1) only when all of its inputs are true (1).',
    inputCount: 2,
    logic: AND_LOGIC,
    truthTable: generateTruthTable(2, AND_LOGIC),
    svgPath: 'M 30 20 L 60 20 A 40 40 0 0 1 60 80 L 30 80 Z',
  },
  OR: {
    type: 'OR',
    name: 'OR Gate',
    description: 'Outputs true (1) if at least one of its inputs is true (1).',
    inputCount: 2,
    logic: OR_LOGIC,
    truthTable: generateTruthTable(2, OR_LOGIC),
    svgPath: 'M 20 20 Q 50 50, 20 80 L 35 80 Q 80 50, 35 20 Z',
  },
  NOT: {
    type: 'NOT',
    name: 'NOT Gate (Inverter)',
    description: 'Outputs the inverse of its single input. A true (1) input becomes false (0), and vice versa.',
    inputCount: 1,
    logic: NOT_LOGIC,
    truthTable: generateTruthTable(1, NOT_LOGIC),
    svgPath: 'M 25 25 L 25 75 L 75 50 Z M 75 50 h 10 m 8 0 a 8 8 0 1 1 0 -0.01',
  },
  XOR: {
    // FIX: The `type` property must be one of the values defined in `GateType`. Changed 'XOR Gate' to 'XOR'.
    type: 'XOR',
    name: 'XOR Gate (Exclusive OR)',
    description: 'Outputs true (1) only when its inputs are different from each other.',
    inputCount: 2,
    logic: XOR_LOGIC,
    truthTable: generateTruthTable(2, XOR_LOGIC),
    svgPath: 'M 25 20 Q 55 50, 25 80 L 40 80 Q 85 50, 40 20 Z M 15 20 Q 45 50, 15 80',
  },
  NAND: {
    // FIX: The `type` property must be one of the values defined in `GateType`. Changed 'NAND Gate' to 'NAND'.
    type: 'NAND',
    name: 'NAND Gate (NOT AND)',
    description: 'Outputs false (0) only when all of its inputs are true (1). It is the inverse of an AND gate.',
    inputCount: 2,
    logic: NAND_LOGIC,
    truthTable: generateTruthTable(2, NAND_LOGIC),
    svgPath: 'M 30 20 L 60 20 A 40 40 0 0 1 60 80 L 30 80 Z M 100 50 a 8 8 0 1 1 -16 0 a 8 8 0 1 1 16 0',
  },
  NOR: {
    // FIX: The `type` property must be one of the values defined in `GateType`. Changed 'NOR Gate' to 'NOR'.
    type: 'NOR',
    name: 'NOR Gate (NOT OR)',
    description: 'Outputs true (1) only when all of its inputs are false (0). It is the inverse of an OR gate.',
    inputCount: 2,
    logic: NOR_LOGIC,
    truthTable: generateTruthTable(2, NOR_LOGIC),
    svgPath: 'M 20 20 Q 50 50, 20 80 L 35 80 Q 80 50, 35 20 Z M 95 50 a 8 8 0 1 1 -16 0 a 8 8 0 1 1 16 0',
  },
  XNOR: {
    // FIX: The `type` property must be one of the values defined in `GateType`. Changed 'XNOR Gate' to 'XNOR'.
    type: 'XNOR',
    name: 'XNOR Gate (Exclusive NOR)',
    description: 'Outputs true (1) only when its inputs are the same. It is the inverse of an XOR gate.',
    inputCount: 2,
    logic: XNOR_LOGIC,
    truthTable: generateTruthTable(2, XNOR_LOGIC),
    svgPath: 'M 25 20 Q 55 50, 25 80 L 40 80 Q 85 50, 40 20 Z M 15 20 Q 45 50, 15 80 M 100 50 a 8 8 0 1 1 -16 0 a 8 8 0 1 1 16 0',
  },
};
