
import React from 'react';
import { GateDefinition } from '../types';

interface TruthTableProps {
  gate: GateDefinition;
}

const TruthTable: React.FC<TruthTableProps> = ({ gate }) => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-xl font-bold mb-4 text-gray-200 text-center">Truth Table</h3>
      <div className="w-full max-w-xs mx-auto flex-grow flex items-center">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-600">
              {gate.truthTable[0].inputs.map((_, index) => (
                <th key={index} className="p-3 text-lg font-medium text-gray-400">
                  Input {String.fromCharCode(65 + index)}
                </th>
              ))}
              <th className="p-3 text-lg font-medium text-gray-400">Output</th>
            </tr>
          </thead>
          <tbody>
            {gate.truthTable.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-gray-700 last:border-b-0">
                {row.inputs.map((input, inputIndex) => (
                  <td key={inputIndex} className={`p-3 text-lg font-mono ${input ? 'text-teal-400' : 'text-red-400'}`}>
                    {input ? '1' : '0'}
                  </td>
                ))}
                <td className={`p-3 text-lg font-mono font-bold ${row.output ? 'text-teal-400' : 'text-red-400'}`}>
                  {row.output ? '1' : '0'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TruthTable;
