
import React, { useState, useMemo, useEffect } from 'react';
import { GateDefinition } from '../types';

interface GateVisualizerProps {
  gate: GateDefinition;
}

const InputToggle: React.FC<{ value: boolean; onChange: () => void; label: string }> = ({ value, onChange, label }) => {
  return (
    <div className="flex items-center space-x-4">
       <button
        onClick={onChange}
        className={`w-16 h-10 flex items-center justify-center text-xl font-mono font-bold rounded-lg border-2 transition-all duration-300 transform active:scale-95
          ${value 
            ? 'bg-teal-500/20 border-teal-500 text-teal-300 shadow-[0_0_15px_rgba(20,208,202,0.5)]' 
            : 'bg-gray-700/50 border-gray-600 text-gray-400'
          }`}
      >
        {value ? '1' : '0'}
      </button>
      <span className="w-16 text-lg text-gray-400">{label}</span>
    </div>
  );
};

const Wire: React.FC<{ active: boolean }> = ({ active }) => (
  <div className={`h-1 w-full transition-colors duration-300 ${active ? 'bg-teal-400' : 'bg-gray-600'}`}></div>
);

const OutputIndicator: React.FC<{ active: boolean }> = ({ active }) => (
    <div className="flex items-center space-x-4">
        <span className="w-16 text-right text-lg text-gray-400">Output</span>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            active 
            ? 'bg-teal-500 shadow-[0_0_20px_rgba(20,208,202,0.7)]' 
            : 'bg-gray-700'
        }`}>
            <span className="font-mono font-bold text-xl">{active ? '1' : '0'}</span>
        </div>
    </div>
);

const GateVisualizer: React.FC<GateVisualizerProps> = ({ gate }) => {
  const [inputs, setInputs] = useState<boolean[]>(() => Array(gate.inputCount).fill(false));
  
  useEffect(() => {
      setInputs(Array(gate.inputCount).fill(false));
  }, [gate.inputCount]);

  const output = useMemo(() => gate.logic(inputs), [gate, inputs]);

  const toggleInput = (index: number) => {
    setInputs(prevInputs => {
      const newInputs = [...prevInputs];
      newInputs[index] = !newInputs[index];
      return newInputs;
    });
  };

  const inputWiresYPositions = gate.inputCount === 1 ? ['50%'] : ['30%', '70%'];

  return (
    <div className="flex flex-col items-center justify-center">
        <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white">{gate.name}</h2>
            <p className="text-gray-400 mt-1 max-w-md mx-auto">{gate.description}</p>
        </div>
      
      <div className="w-full h-48 md:h-56 relative flex items-center justify-center">
        {/* Inputs Section */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-around w-1/4">
          {inputs.map((inputState, index) => (
            <InputToggle 
                key={index} 
                value={inputState} 
                onChange={() => toggleInput(index)} 
                label={`Input ${String.fromCharCode(65 + index)}`}
            />
          ))}
        </div>
        
        {/* Wires and Gate */}
        <div className="absolute left-1/4 top-0 bottom-0 right-1/4">
          {/* Input Wires */}
          {inputs.map((inputState, index) => (
            <div 
              key={index} 
              className="absolute left-0 w-1/3" 
              style={{ top: inputWiresYPositions[index], transform: 'translateY(-50%)' }}
            >
              <Wire active={inputState} />
            </div>
          ))}

          {/* Gate SVG */}
          <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-full flex items-center justify-center">
            <svg viewBox="0 0 120 100" className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
              <path 
                d={gate.svgPath} 
                stroke={output ? '#2dd4bf' : '#9ca3af'}
                strokeWidth="5" 
                fill="none" 
                className="transition-all duration-300"
              />
            </svg>
          </div>
          
          {/* Output Wire */}
          <div 
            className="absolute right-0 w-1/3"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
             <Wire active={output} />
          </div>
        </div>

        {/* Output Section */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-center w-1/4">
           <OutputIndicator active={output} />
        </div>
      </div>
    </div>
  );
};

export default GateVisualizer;
