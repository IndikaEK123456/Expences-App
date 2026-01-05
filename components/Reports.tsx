
import React, { useMemo, useState } from 'react';
import { Transaction, ExpenseCategory, IncomeCategory } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { CATEGORY_STYLES } from '../constants';

interface ReportsProps {
  transactions: Transaction[];
}

const Reports: React.FC<ReportsProps> = ({ transactions }) => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  });

  const months = useMemo(() => {
    const unique = new Set<string>();
    transactions.forEach(t => {
      const d = new Date(t.date);
      unique.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    });
    // Add current month if not exists
    const d = new Date();
    unique.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
    return Array.from(unique).sort().reverse();
  }, [transactions]);

  const monthData = useMemo(() => {
    const filtered = transactions.filter(t => t.date.startsWith(selectedMonth));
    
    const totals = filtered.reduce((acc, t) => {
      if (t.type === 'income') acc.income += t.amount;
      else acc.expense += t.amount;
      return acc;
    }, { income: 0, expense: 0 });

    const expenseByCategory = filtered
      .filter(t => t.type === 'expense')
      .reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const incomeByCategory = filtered
      .filter(t => t.type === 'income')
      .reduce((acc: Record<string, number>, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const pieData = Object.entries(expenseByCategory).map(([name, value]) => ({ name, value }));
    const barData = [
      { name: 'Income', amount: totals.income, color: '#10b981' },
      { name: 'Expense', amount: totals.expense, color: '#f43f5e' }
    ];

    return { totals, expenseByCategory, incomeByCategory, pieData, barData };
  }, [selectedMonth, transactions]);

  const COLORS = ['#10b981', '#f43f5e', '#3b82f6', '#f59e0b', '#8b5cf6', '#64748b', '#ec4899'];

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col space-y-2">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Select Month</label>
        <select 
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-white border-0 rounded-2xl py-3 px-4 font-bold shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none"
        >
          {months.map(m => (
            <option key={m} value={m}>{new Date(m + '-01').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 text-slate-800">Monthly Overview</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthData.barData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 600 }} />
              <YAxis hide />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="amount" radius={[8, 8, 0, 0]} barSize={40}>
                {monthData.barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold mb-4 text-slate-800">Expense Distribution</h3>
        {monthData.pieData.length > 0 ? (
          <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={monthData.pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {monthData.pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total</span>
              <span className="text-lg font-bold text-slate-800">${monthData.totals.expense.toLocaleString()}</span>
            </div>
          </div>
        ) : (
          <div className="py-12 text-center text-slate-400">No data available</div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 px-1">Detailed Breakdown</h3>
        <div className="space-y-3">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest px-2">Income Categories</p>
            {Object.entries(monthData.incomeByCategory).map(([cat, amount]) => (
               <BreakdownRow key={cat} category={cat} amount={amount} type="income" />
            ))}
            {Object.keys(monthData.incomeByCategory).length === 0 && (
               <p className="text-xs text-slate-400 text-center py-4 bg-white rounded-2xl">No income entries</p>
            )}
          </div>
          
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-rose-500 uppercase tracking-widest px-2">Expense Categories</p>
            {Object.entries(monthData.expenseByCategory).map(([cat, amount]) => (
               <BreakdownRow key={cat} category={cat} amount={amount} type="expense" />
            ))}
            {Object.keys(monthData.expenseByCategory).length === 0 && (
               <p className="text-xs text-slate-400 text-center py-4 bg-white rounded-2xl">No expense entries</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface BreakdownRowProps {
  category: string;
  amount: number;
  type: 'income' | 'expense';
}

const BreakdownRow: React.FC<BreakdownRowProps> = ({ category, amount, type }) => {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES['Others'];
  return (
    <div className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-100 shadow-sm">
      <div className="flex items-center space-x-3">
        <div className={`w-8 h-8 ${style.bgColor} ${style.color} rounded-lg flex items-center justify-center text-xs`}>
          {style.icon}
        </div>
        <span className="font-semibold text-slate-700 text-sm">{category}</span>
      </div>
      <span className={`font-bold text-sm ${type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
        ${amount.toLocaleString()}
      </span>
    </div>
  );
};

export default Reports;
