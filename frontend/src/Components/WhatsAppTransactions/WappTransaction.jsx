import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext.jsx";

const TransactionHistory = () => {
  const { transactionHistory, getTransactions } = useGlobalContext();

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <HistoryStyled>
      <h2>Recent Transactions</h2>
      <ul>
        {transactionHistory().map((item) => (
          <li key={item._id}>
            <div className="row">
              <span className={`type ${item.type}`}>{item.type.toUpperCase()}</span>
              <span>₹{item.amount}</span>
              <span>{item.category}</span>
              <span className="date">
                {new Date(item.date || item.timestamp || item.createdAt).toLocaleString()}
              </span>
              <span className="source">{item.source || "Manual"}</span>
            </div>
          </li>
        ))}
      </ul>
    </HistoryStyled>
  );
};

const HistoryStyled = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 10px;

  h2 {
    margin-bottom: 1rem;
    font-size: 1.4rem;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .row {
    display: flex;
    justify-content: space-between;
    background: #fff;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
    font-size: 0.95rem;
  }

  .type.income {
    color: green;
    font-weight: 600;
  }

  .type.expense {
    color: red;
    font-weight: 600;
  }

  .date {
    font-style: italic;
    color: #666;
  }

  .source {
    font-weight: 400;
    color: #333;
  }
`;

export default TransactionHistory;
