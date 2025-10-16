
import React from 'react';
import { GATES } from '../constants';
import { GateType } from '../types';

interface LogicGateSelectorProps {
  selected: GateType;
  onSelect: (gate: GateType) => void;
}

const LogicGateSelector: React.FC<LogicGateSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3 p-3 rounded-full bg-gray-800/80 border border-gray-700 max-w-2xl mx-auto">
      {Object.values(GATES).map((gate) => (
        <button
          key={gate.type}
          onClick={() => onSelect(gate.type)}
          className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-900
            ${selected === gate.type 
              ? 'bg-teal-500 text-white shadow-lg' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
            }`}
        >
          {gate.type}
        </button>
      ))}
    </div>
  );
};

export default LogicGateSelector;
