
export type TransactionType = 'income' | 'expense';

export enum ExpenseCategory {
  Foods = 'Foods',
  Medicines = 'Medicines',
  Travelling = 'Travelling',
  DogExpenses = 'Dog expenses',
  Maintenance = 'Maintenance',
  Entertainments = 'Entertainments',
  Others = 'Others'
}

export enum IncomeCategory {
  Salary = 'Salary',
  Others = 'Others'
}

export type Category = ExpenseCategory | IncomeCategory;

export interface Transaction {
  id: string;
  type: TransactionType;
  category: Category;
  amount: number;
  date: string; // ISO string
  note: string;
}

export interface MonthlySummary {
  month: string; // YYYY-MM
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
}
