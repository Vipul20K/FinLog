import { useCallback, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const useIncome = (setError) => {
  const [incomes, setIncomes] = useState([]);

  const addIncome = async (income) => {
    try {
      await axiosInstance.post("/add-income", income);
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding income");
    }
  };

  const getIncomes = useCallback(async (start, end) => {
    try {
      const params = {};
      if (start) params.start = start;
      if (end) params.end = end;

      const [manualRes, whatsappRes] = await Promise.all([
        axiosInstance.get("/get-incomes", { params }),
        axiosInstance.get("/get-WhatsAppTransactions", { params }),
      ]);

      const manualIncomes = manualRes.data || [];
      const whatsappIncomes = (whatsappRes.data || [])
        .filter((tx) => tx.type === "income")
        .map((tx) => ({
          ...tx,
          title: tx.category || "Auto Entry",
          description: "Logged via WhatsApp",
          date: tx.timestamp,
          source: "WhatsApp",
        }));

      setIncomes([...manualIncomes, ...whatsappIncomes]);
      setError(null);
    } catch (err) {
      setError("Failed to fetch incomes");
      setIncomes([]);
    }
  }, []);

  const deleteIncome = async (item) => {
    const url =
      item.source === "WhatsApp"
        ? `/delete-WhatsAppTransaction/${item._id}`
        : `/delete-income/${item._id}`;
    await axiosInstance.delete(url);
    getIncomes();
  };

  const totalIncome = () =>
    incomes.reduce((acc, curr) => acc + curr.amount, 0);

  return { incomes, addIncome, getIncomes, deleteIncome, totalIncome };
};
