
import React from 'react';
import { Transaction } from '../types';
import { CATEGORY_STYLES } from '../constants';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-400">
        <i className="fa-solid fa-receipt text-4xl mb-4 opacity-20"></i>
        <p className="text-sm">No transactions found</p>
      </div>
    );
  }

  // Group by date
  const grouped = transactions.reduce((groups: Record<string, Transaction[]>, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-2">{date}</p>
          <div className="space-y-2">
            {(items as Transaction[]).map((t) => {
              const style = CATEGORY_STYLES[t.category] || CATEGORY_STYLES['Others'];
              return (
                <div 
                  key={t.id} 
                  className="bg-white p-3 rounded-2xl flex items-center justify-between border border-slate-100 shadow-sm active:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${style.bgColor} ${style.color} rounded-xl flex items-center justify-center`}>
                      {style.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{t.category}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[150px]">{t.note || 'No description'}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className={`font-bold text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {t.type === 'income' ? '+' : '-'}Rs {t.amount.toLocaleString()}
                    </p>
                    <button 
                      onClick={() => onDelete(t.id)}
                      className="text-[10px] text-slate-300 hover:text-rose-400 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
