
import React, { useState } from 'react';
import { TransactionType, ExpenseCategory, IncomeCategory, Category } from '../types';

interface AddTransactionModalProps {
  onClose: () => void;
  onSubmit: (data: { type: TransactionType; category: Category; amount: number; date: string; note: string }) => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ onClose, onSubmit }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>(ExpenseCategory.Foods);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;

    onSubmit({
      type,
      category,
      amount: Math.abs(Number(amount)),
      date,
      note
    });
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategory(newType === 'income' ? IncomeCategory.Salary : ExpenseCategory.Foods);
  };

  const expenseCategories = Object.values(ExpenseCategory);
  const incomeCategories = Object.values(IncomeCategory);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white rounded-t-[32px] p-6 pb-12 shadow-2xl animate-slide-up">
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
        
        <h2 className="text-xl font-bold text-center mb-6">Add Transaction</h2>
        
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
          <button 
            onClick={() => handleTypeChange('expense')}
            className={`w-1/2 py-2.5 rounded-xl font-bold text-sm transition-all ${type === 'expense' ? 'bg-white text-rose-500 shadow-sm' : 'text-slate-500'}`}
          >
            Expense
          </button>
          <button 
            onClick={() => handleTypeChange('income')}
            className={`w-1/2 py-2.5 rounded-xl font-bold text-sm transition-all ${type === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
          >
            Income
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
            <input 
              type="number" 
              placeholder="0.00"
              className="w-full bg-slate-50 border-0 rounded-2xl py-4 pl-8 pr-4 text-2xl font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              autoFocus
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">Category</label>
            <div className="grid grid-cols-4 gap-2">
              {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-1 rounded-xl text-[10px] font-bold border-2 transition-all truncate ${category === cat ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-50 bg-slate-50 text-slate-500'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">Date</label>
              <input 
                type="date" 
                className="w-full bg-slate-50 rounded-2xl py-3 px-4 text-sm font-medium border-0 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">Note (Optional)</label>
              <input 
                type="text" 
                placeholder="Buy food..."
                className="w-full bg-slate-50 rounded-2xl py-3 px-4 text-sm font-medium border-0 focus:ring-2 focus:ring-emerald-500 outline-none"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <button 
            type="submit"
            className={`w-full py-4 rounded-2xl text-white font-bold shadow-lg transition-transform active:scale-95 ${type === 'income' ? 'bg-emerald-600 shadow-emerald-200' : 'bg-rose-500 shadow-rose-200'}`}
          >
            Add {type === 'income' ? 'Income' : 'Expense'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
