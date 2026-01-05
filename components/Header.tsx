
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white px-6 pt-8 pb-4 flex justify-between items-center border-b border-slate-100">
      <div>
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Welcome back,</p>
        <h1 className="text-2xl font-bold text-slate-800">SpendWise Pro</h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-emerald-100 border-2 border-emerald-500 overflow-hidden flex items-center justify-center">
        <i className="fa-solid fa-user text-emerald-600"></i>
      </div>
    </header>
  );
};

export default Header;
