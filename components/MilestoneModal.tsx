
import React, { useState } from 'react';
import { MilestoneState } from '../types';

interface MilestoneModalProps {
  label: string;
  milestoneKey: string;
  currentState?: MilestoneState;
  onClose: () => void;
  onSave: (key: string, data: MilestoneState) => void;
}

const MilestoneModal: React.FC<MilestoneModalProps> = ({ label, milestoneKey, currentState, onClose, onSave }) => {
  const [result, setResult] = useState<'novelty' | 'managed'>(currentState?.result || 'managed');
  const [observation, setObservation] = useState(currentState?.observation || '');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div>
            <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest">Gestión de Seguimiento</h4>
            <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-widest mt-0.5">{label}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Estado de Gestión</label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setResult('managed')}
                className={`py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${result === 'managed' ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-500/10' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
              >
                Gestionado
              </button>
              <button 
                onClick={() => setResult('novelty')}
                className={`py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${result === 'novelty' ? 'bg-amber-50 border-amber-500 text-amber-700 shadow-md shadow-amber-500/10' : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'}`}
              >
                Con Novedad
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Observación</label>
            <textarea 
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl text-xs font-bold text-gray-700 outline-none transition-all placeholder:font-normal min-h-[100px] resize-none"
              placeholder="Describa el resultado del seguimiento..."
            />
          </div>

          <button 
            onClick={() => onSave(milestoneKey, { status: 'completed', result, observation })}
            className="w-full py-4 bg-emerald-800 text-white text-xs font-black rounded-2xl hover:bg-emerald-900 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all uppercase tracking-[0.2em]"
          >
            Guardar Gestión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilestoneModal;
