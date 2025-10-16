
import React, { useState, useMemo } from 'react';
import { GateType, GateDefinition } from './types';
import { GATES } from './constants';
import LogicGateSelector from './components/LogicGateSelector';
import GateVisualizer from './components/GateVisualizer';
import TruthTable from './components/TruthTable';

const App: React.FC = () => {
  const [selectedGate, setSelectedGate] = useState<GateType>('AND');

  const gateDefinition = useMemo<GateDefinition>(() => GATES[selectedGate], [selectedGate]);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans antialiased">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Interactive Logic Gate Visualizer
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
            Explore the fundamentals of digital electronics. Select a gate, toggle the inputs, and see the logic in action.
          </p>
        </header>

        <main>
          <LogicGateSelector selected={selectedGate} onSelect={setSelectedGate} />
          
          <div className="mt-8 bg-gray-800/50 rounded-2xl shadow-2xl shadow-black/20 backdrop-blur-sm border border-gray-700 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              <div className="lg:col-span-3 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-gray-700">
                 <GateVisualizer key={selectedGate} gate={gateDefinition} />
              </div>
              <div className="lg:col-span-2 p-6 md:p-8">
                 <TruthTable gate={gateDefinition} />
              </div>
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-12 text-gray-500">
            <p>Designed to make digital logic intuitive and fun.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
