
import React from 'react';
import { ExpenseCategory, IncomeCategory } from './types';

export const CATEGORY_STYLES: Record<string, { icon: React.ReactNode; color: string; bgColor: string }> = {
  [ExpenseCategory.Foods]: {
    icon: <i className="fa-solid fa-utensils"></i>,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  [ExpenseCategory.Medicines]: {
    icon: <i className="fa-solid fa-pills"></i>,
    color: 'text-rose-600',
    bgColor: 'bg-rose-100'
  },
  [ExpenseCategory.Travelling]: {
    icon: <i className="fa-solid fa-plane"></i>,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  [ExpenseCategory.DogExpenses]: {
    icon: <i className="fa-solid fa-dog"></i>,
    color: 'text-amber-700',
    bgColor: 'bg-amber-100'
  },
  [ExpenseCategory.Maintenance]: {
    icon: <i className="fa-solid fa-tools"></i>,
    color: 'text-slate-600',
    bgColor: 'bg-slate-100'
  },
  [ExpenseCategory.Entertainments]: {
    icon: <i className="fa-solid fa-film"></i>,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  [ExpenseCategory.Others]: {
    icon: <i className="fa-solid fa-ellipsis"></i>,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100'
  },
  [IncomeCategory.Salary]: {
    icon: <i className="fa-solid fa-wallet"></i>,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100'
  }
  // Removed duplicate key for 'Others' as both ExpenseCategory.Others and IncomeCategory.Others evaluate to the same string value.
};
