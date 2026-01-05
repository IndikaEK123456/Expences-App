
import React, { useState, useEffect, useMemo } from 'react';
import { Transaction, TransactionType, ExpenseCategory, IncomeCategory } from './types';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import SummaryDashboard from './components/SummaryDashboard';
import Reports from './components/Reports';

const App: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('spendwise_transactions');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState<'home' | 'reports'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('spendwise_transactions', JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
    setIsModalOpen(false);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const currentMonthTransactions = useMemo(() => {
    const now = new Date();
    return transactions.filter(t => {
      const d = new Date(t.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
  }, [transactions]);

  const totals = useMemo(() => {
    return currentMonthTransactions.reduce((acc, t) => {
      if (t.type === 'income') acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    }, { income: 0, expense: 0 });
  }, [currentMonthTransactions]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 pb-20 max-w-md mx-auto shadow-2xl overflow-hidden min-h-screen">
      <Header />
      
      <main className="flex-1 overflow-y-auto px-4 pt-4 space-y-6">
        {activeTab === 'home' ? (
          <>
            <SummaryDashboard 
              income={totals.income} 
              expense={totals.expense} 
            />
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
                <button className="text-sm font-medium text-emerald-600">See All</button>
              </div>
              <TransactionList 
                transactions={transactions.slice(0, 20)} 
                onDelete={deleteTransaction} 
              />
            </div>
          </>
        ) : (
          <Reports transactions={transactions} />
        )}
      </main>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-emerald-700 transition-transform active:scale-95 z-40"
      >
        <i className="fa-solid fa-plus"></i>
      </button>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-area-bottom z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          <button 
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <i className={`fa-solid fa-house text-lg ${activeTab === 'home' ? 'mb-1' : ''}`}></i>
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button 
            onClick={() => setActiveTab('reports')}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'reports' ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            <i className={`fa-solid fa-chart-pie text-lg ${activeTab === 'reports' ? 'mb-1' : ''}`}></i>
            <span className="text-[10px] font-medium">Reports</span>
          </button>
        </div>
      </nav>

      {isModalOpen && (
        <AddTransactionModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={addTransaction}
        />
      )}
    </div>
  );
};

export default App;
