
import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext.jsx';
import History from '../../History/History.jsx';
import { InnerLayout } from '../../styles/Layouts.jsx';
import { rupee } from '../../utils/Icons.jsx';
import Chart from '../Chart/Chart.jsx';
import './Dashboard.css'; 

function Dashboard() {
    const {
        totalExpenses,
        incomes,
        expenses,
        totalIncome,
        totalBalance,
        getIncomes,
        getExpenses
    } = useGlobalContext();

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    return (
        <div className="dashboard">
            <InnerLayout>
                <h1>All Transactions</h1>
                <div className="stats-con">
                    <div className="chart-con">
                        <Chart />
                        <div className="amount-con">
                            <div className="income">
                                <h2>Total Income</h2>
                                <p>{rupee} {totalIncome()}</p>
                            </div>
                            <div className="expense">
                                <h2>Total Expense</h2>
                                <p>{rupee} {totalExpenses()}</p>
                            </div>
                            <div className="balance">
                                <h2>Total Balance</h2>
                                <p>{rupee} {totalBalance()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="history-con">
                        <History />
                        <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>{rupee}{Math.min(...incomes.map(item => item.amount))}</p>
                            <p>{rupee}{Math.max(...incomes.map(item => item.amount))}</p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>{rupee}{Math.min(...expenses.map(item => item.amount))}</p>
                            <p>{rupee}{Math.max(...expenses.map(item => item.amount))}</p>
                        </div>
                    </div>
                </div>
            </InnerLayout>
        </div>
    );
}

export default Dashboard;
