import { useCallback, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const useExpense = (setError) => {
  const [expenses, setExpenses] = useState([]);

  const addExpense = async (expense) => {
    try {
      await axiosInstance.post("/add-expense", expense);
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding expense");
    }
  };

  const getExpenses = useCallback(async (start, end) => {
    try {
      const params = {};
      if (start) params.start = start;
      if (end) params.end = end;

      const [manualRes, txRes] = await Promise.all([
        axiosInstance.get("/get-expenses", { params }),
        axiosInstance.get("/get-WhatsAppTransactions", { params }),
      ]);

      const manualExpenses = manualRes.data || [];
      const whatsappExpenses = (txRes.data || [])
        .filter((tx) => tx.type === "expense")
        .map((tx) => ({
          ...tx,
          title: tx.category || "Auto Entry",
          description: "Logged via WhatsApp",
          date: tx.timestamp,
          source: "WhatsApp",
        }));

      setExpenses([...manualExpenses, ...whatsappExpenses]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch expenses");
      setExpenses([]);
    }
  }, []);

  const deleteExpense = async (item) => {
    const url =
      item.source === "WhatsApp"
        ? `/delete-WhatsAppTransaction/${item._id}`
        : `/delete-expense/${item._id}`;
    await axiosInstance.delete(url);
    getExpenses();
  };

  const totalExpenses = () =>
    expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return { expenses, addExpense, getExpenses, deleteExpense, totalExpenses };
};
