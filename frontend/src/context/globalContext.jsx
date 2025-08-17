


import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthProvider";
import { useIncome } from "./IncomeProvider";
import { useExpense } from "./ExpenseProvider";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const auth = useAuth(setError);
  const income = useIncome(setError);
  const expense = useExpense(setError);

  const totalBalance = () => income.totalIncome() - expense.totalExpenses();

  const transactionHistory = () => {
    const history = [...income.incomes, ...expense.expenses];
    return history
      .sort(
        (a, b) =>
          new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
      )
      .slice(0, 5);
  };

  return (
    <GlobalContext.Provider
      value={{
        ...auth,
        ...income,
        ...expense,
        error,
        setError,
        totalBalance,
        transactionHistory,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };
