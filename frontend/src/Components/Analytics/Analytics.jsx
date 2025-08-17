


// import React, { useEffect, useState } from "react";
// import { Bar, Doughnut } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";
// import axiosInstance from "../../utils/axiosInstance";
// import { useGlobalContext } from "../../context/globalContext";
// import DateFilter from "../../Components/DateFilter.jsx";

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// const Analytics = () => {
//   const { user } = useGlobalContext();
//   const [analytics, setAnalytics] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filterParams, setFilterParams] = useState({});

//   const fetchAnalytics = async (params = {}) => {
//     try {
//       if (!(user?.id || user?._id)) return;
//       setLoading(true);
//       const res = await axiosInstance.get("/analytics", { params });
//       setAnalytics(res.data);
//     } catch (err) {
//       console.error("Error fetching analytics:", err);
//       setAnalytics(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAnalytics(filterParams);
//   }, [user, filterParams]);

//   const handleDateFilter = (params) => {
//     setFilterParams(params);
//   };

//   if (loading) return <div className="text-center mt-10 text-gray-700">Loading analytics...</div>;
//   if (!analytics) return <div className="text-center mt-10 text-red-600">Failed to load analytics.</div>;

//   const totalChartData = {
//     labels: ["Total Income", "Total Expense"],
//     datasets: [
//       {
//         label: "Amount (₹)",
//         data: [analytics.totalIncome, analytics.totalExpense],
//         backgroundColor: ["#4CAF50", "#F44336"],
//         borderRadius: 5,
//       },
//     ],
//   };

//   const incomeCategories = analytics.categoryDistribution.filter((c) => c.type === "income");
//   const expenseCategories = analytics.categoryDistribution.filter((c) => c.type === "expense");

//   const incomeCategoryData = {
//     labels: incomeCategories.map((c) => c.category),
//     datasets: [
//       {
//         label: "Income by Category",
//         data: incomeCategories.map((c) => c.total),
//         backgroundColor: ["#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9"],
//       },
//     ],
//   };

//   const expenseCategoryData = {
//     labels: expenseCategories.map((c) => c.category),
//     datasets: [
//       {
//         label: "Expense by Category",
//         data: expenseCategories.map((c) => c.total),
//         backgroundColor: ["#EF5350", "#E57373", "#EF9A9A", "#FFCDD2"],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg text-gray-800">
//       <h2 className="text-center text-2xl font-bold mb-6 text-gray-900">WalletFlow Analytics</h2>

//       {/* Date Filter */}
//       <DateFilter onFilter={handleDateFilter} label="Analytics" />

//       {/* Total Income vs Expense */}
//       <div className="mb-10 flex justify-center">
//         <div className="w-4/5 max-w-3xl bg-gray-100 p-5 rounded-xl">
//           <Bar
//             data={totalChartData}
//             options={{
//               responsive: true,
//               plugins: {
//                 legend: {
//                   display: true,
//                   labels: { color: "black" },
//                 },
//                 title: {
//                   display: true,
//                   text: "Income vs Expense Overview",
//                   color: "black",
//                   font: { size: 18 },
//                   align: "center",
//                 },
//               },
//               scales: {
//                 x: { ticks: { color: "black" } },
//                 y: { ticks: { color: "black" }, beginAtZero: true },
//               },
//             }}
//           />
//         </div>
//       </div>

//       {/* Category Breakdown */}
//       <div className="flex flex-wrap gap-6 justify-between">
//         <div className="bg-gray-200 p-5 rounded-xl flex-1 min-w-[300px] flex flex-col items-center shadow-sm">
//           <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
//             Category-Wise Distribution of Income
//           </h3>
//           {incomeCategories.length ? (
//             <div className="w-[70%] max-w-[600px]">
//               <Doughnut data={incomeCategoryData} />
//             </div>
//           ) : (
//             <p className="text-gray-500">No income data</p>
//           )}
//         </div>

//         <div className="bg-gray-200 p-5 rounded-xl flex-1 min-w-[300px] flex flex-col items-center shadow-sm">
//           <h3 className="text-lg font-semibold text-center mb-4 text-gray-800">
//             Category-Wise Distribution of Expenses
//           </h3>
//           {expenseCategories.length ? (
//             <div className="w-[70%] max-w-[600px]">
//               <Doughnut data={expenseCategoryData} />
//             </div>
//           ) : (
//             <p className="text-gray-500">No expense data</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;


import React, { useEffect, useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axiosInstance from "../../utils/axiosInstance";
import { useGlobalContext } from "../../context/globalContext";
import DateFilter from "../../Components/DateFilter.jsx";
import "./Analytics.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const { user } = useGlobalContext();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterParams, setFilterParams] = useState({});

  const fetchAnalytics = async (params = {}) => {
    try {
      if (!(user?.id || user?._id)) return;
      setLoading(true);
      const res = await axiosInstance.get("/analytics", { params });
      setAnalytics(res.data);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics(filterParams);
  }, [user, filterParams]);

  const handleDateFilter = (params) => {
    setFilterParams(params);
  };

  if (loading)
    return <div className="analytics-loading">Loading analytics...</div>;

  if (!analytics)
    return <div className="analytics-error">Failed to load analytics.</div>;

  const totalChartData = {
    labels: ["Total Income", "Total Expense"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [analytics.totalIncome, analytics.totalExpense],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderRadius: 5,
      },
    ],
  };

  const incomeCategories = analytics.categoryDistribution.filter(
    (c) => c.type === "income"
  );
  const expenseCategories = analytics.categoryDistribution.filter(
    (c) => c.type === "expense"
  );

  const incomeCategoryData = {
    labels: incomeCategories.map((c) => c.category),
    datasets: [
      {
        label: "Income by Category",
        data: incomeCategories.map((c) => c.total),
        backgroundColor: ["#66BB6A", "#81C784", "#A5D6A7", "#C8E6C9"],
      },
    ],
  };

  const expenseCategoryData = {
    labels: expenseCategories.map((c) => c.category),
    datasets: [
      {
        label: "Expense by Category",
        data: expenseCategories.map((c) => c.total),
        backgroundColor: ["#EF5350", "#E57373", "#EF9A9A", "#FFCDD2"],
      },
    ],
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">WalletFlow Analytics</h2>

      {/* Date Filter */}
      <DateFilter onFilter={handleDateFilter} label="Analytics" />

      {/* Total Income vs Expense */}
      <div className="chart-wrapper">
        <Bar
          data={totalChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                labels: { color: "black" },
              },
              title: {
                display: true,
                text: "Income vs Expense Overview",
                color: "black",
                font: { size: 18 },
                align: "center",
              },
            },
            scales: {
              x: { ticks: { color: "black" } },
              y: { ticks: { color: "black" }, beginAtZero: true },
            },
          }}
        />
      </div>

      {/* Category Breakdown */}
      <div className="category-section">
        <div className="category-card">
          <h3 className="category-title">
            Category-Wise Distribution of Income
          </h3>
          {incomeCategories.length ? (
            <div className="donut-wrapper">
              <Doughnut data={incomeCategoryData} />
            </div>
          ) : (
            <p className="no-data-text">No income data</p>
          )}
        </div>

        <div className="category-card">
          <h3 className="category-title">
            Category-Wise Distribution of Expenses
          </h3>
          {expenseCategories.length ? (
            <div className="donut-wrapper">
              <Doughnut data={expenseCategoryData} />
            </div>
          ) : (
            <p className="no-data-text">No expense data</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
