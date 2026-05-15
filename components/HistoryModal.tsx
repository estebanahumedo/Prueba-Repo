
import React, { useState } from 'react';
import { HistoryEntry } from '../types';

interface HistoryModalProps {
  label: string;
  history: HistoryEntry[];
  onClose: () => void;
  onAddObservation: (observation: string) => void;
}

const HistoryModal: React.FC<HistoryModalProps> = ({ label, history, onClose, onAddObservation }) => {
  const [newObservation, setNewObservation] = useState('');

  const handleSave = () => {
    if (newObservation.trim()) {
      onAddObservation(newObservation);
      setNewObservation('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="px-10 py-8 border-b border-gray-100 flex items-center justify-between bg-white">
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight uppercase">HISTORIAL</h3>
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mt-1">{label}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <div className="p-8 max-h-[400px] overflow-y-auto space-y-6">
          {history.length > 0 ? (
            <div className="space-y-6">
              {history.map((entry, idx) => (
                <div key={entry.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-[2px] before:bg-gray-100 last:before:bg-transparent">
                  <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-white"></div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">{entry.date}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest ${
                      entry.type === 'observation' ? 'bg-blue-50 text-blue-600' : 
                      entry.type === 'change' ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-500'
                    }`}>
                      {entry.type === 'observation' ? 'Observación' : entry.type === 'change' ? 'Cambio' : 'Sistema'}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-700 leading-relaxed">{entry.description}</p>
                  <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase tracking-widest">Por: {entry.user}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 opacity-30">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-3"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <p className="text-[10px] font-black uppercase tracking-[0.2em]">Sin registros históricos</p>
            </div>
          )}
        </div>

        <div className="px-10 py-8 bg-gray-50/50 border-t border-gray-100">
          <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">AGREGAR OBSERVACIÓN</label>
          <textarea 
            value={newObservation}
            onChange={(e) => setNewObservation(e.target.value)}
            className="w-full p-6 text-sm font-bold text-gray-700 bg-white border-2 border-transparent focus:border-emerald-400 rounded-3xl min-h-[100px] outline-none transition-all placeholder:text-gray-300 shadow-inner"
            placeholder="Escriba aquí la observación..."
          />
          <button 
            onClick={handleSave}
            disabled={!newObservation.trim()}
            className="w-full mt-6 py-5 bg-emerald-800 text-white font-black text-xs uppercase tracking-[0.25em] rounded-3xl shadow-xl shadow-emerald-900/20 hover:bg-emerald-900 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all font-sans"
          >
            GUARDAR OBSERVACIÓN
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
