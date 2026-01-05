
import React from 'react';

interface SummaryDashboardProps {
  income: number;
  expense: number;
}

const SummaryDashboard: React.FC<SummaryDashboardProps> = ({ income, expense }) => {
  const balance = income - expense;

  return (
    <div className="relative overflow-hidden bg-emerald-600 rounded-3xl p-6 text-white shadow-xl">
      <div className="relative z-10">
        <p className="text-emerald-100 text-sm font-medium mb-1">Total Balance</p>
        <h3 className="text-3xl font-bold mb-6">${balance.toLocaleString()}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-400/20 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-arrow-down text-emerald-300"></i>
            </div>
            <div>
              <p className="text-emerald-200 text-[10px] uppercase font-bold tracking-tight">Income</p>
              <p className="text-sm font-semibold">${income.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 flex items-center space-x-3">
            <div className="w-8 h-8 bg-rose-400/20 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-arrow-up text-rose-300"></i>
            </div>
            <div>
              <p className="text-emerald-200 text-[10px] uppercase font-bold tracking-tight">Expense</p>
              <p className="text-sm font-semibold">${expense.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative background circle */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full"></div>
    </div>
  );
};

export default SummaryDashboard;
