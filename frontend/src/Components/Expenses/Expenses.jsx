// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext.jsx';
// import { InnerLayout } from '../../styles/Layouts.jsx';
// import ExpenseForm from './ExpenseForm.jsx';
// import IncomeItem from '../IncomeItem/IncomeItem.jsx'; // As per your original code
// import DateFilter from '../DateFilter.jsx'; // Adjust path accordingly
// import { rupee } from '../../utils/Icons.jsx';

// function Expenses() {
//   const { expenses, getExpenses, deleteExpense, totalExpenses, error } = useGlobalContext();

//   useEffect(() => {
//     getExpenses(); // Load all expenses initially
//   }, [getExpenses]);

//   const handleFilter = ({ start, end }) => {
//     getExpenses(start, end);
//   };

//   const resetFilter = () => {
//     getExpenses();
//   };

//   return (
//     <ExpenseStyled>
//       <InnerLayout>
//         {/* <h1>Expenses</h1> */}
//         <h2 className="total-income">
//           Total Expense: <span>{rupee}{totalExpenses()}</span>
//         </h2>

//         <FilterContainer>
//           <DateFilter onFilter={handleFilter} label="Expense" />
//           {expenses.length > 0 && (
//             <ResetButton type="button" onClick={resetFilter}>
//               Reset Filter
//             </ResetButton>
//           )}
//         </FilterContainer>

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <div className="income-content">
//           <div className="form-container">
//             <ExpenseForm />
//           </div>
//           <div className="incomes">
//             {expenses.length === 0 ? (
//               <p>No expenses found for the selected filter.</p>
//             ) : (
//               expenses.map((expense) => {
//                 const { _id, title, amount, date, category, description, type, source } = expense;
//                 return (
//                   <IncomeItem
//                     key={_id}
//                     id={_id}
//                     title={title}
//                     description={description}
//                     amount={amount}
//                     date={date}
//                     type={type}
//                     category={category}
//                     indicatorColor="var(--color-green)"
//                     deleteItem={deleteExpense}
//                     source={source || 'manual'}
//                   />
//                 );
//               })
//             )}
//           </div>
//         </div>
//       </InnerLayout>
//     </ExpenseStyled>
//   );
// }

// const ExpenseStyled = styled.div`
//   display: flex;
//   overflow: auto;

//   .total-income {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     background: #FCF6F9;
//     border: 2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//     border-radius: 20px;
//     padding: 1rem;
//     margin: 1rem 0;
//     font-size: 2rem;
//     gap: 0.5rem;

//     span {
//       font-size: 2.5rem;
//       font-weight: 800;
//       color: var(--color-green);
//     }
//   }

//   .income-content {
//     display: flex;
//     gap: 2rem;

//     .incomes {
//       flex: 1;
//     }
//   }
// `;

// // New styled-components for the filter row container and button
// const FilterContainer = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   margin-top: 1rem;
// `;

// const ResetButton = styled.button`
//   cursor: pointer;
//   background-color: var(--color-green);
//   color: #fff;
//   border: none;
//   padding: 0.5rem 1rem;
//   font-size: 1rem;
//   border-radius: 6px;
//   font-weight: 600;
//   height: 55px; /* approximate height to match inputs/select */
//   transition: background-color 0.3s ease;

//   &:hover,
//   &:focus {
//     background-color: #21867a;
//     outline: none;
//   }
// `;

// export default Expenses;


import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext.jsx';
import { InnerLayout } from '../../styles/Layouts.jsx';
import ExpenseForm from './ExpenseForm.jsx';
import IncomeItem from '../IncomeItem/IncomeItem.jsx';
import DateFilter from '../DateFilter.jsx';
import { rupee } from '../../utils/Icons.jsx';
import './Expenses.css';

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses, error } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const handleFilter = ({ start, end }) => {
    getExpenses(start, end);
  };

  const resetFilter = () => {
    getExpenses();
  };

  return (
    <div className="expenses-container">
      <InnerLayout>
        <h2 className="total-income">
          Total Expense: <span>{rupee}{totalExpenses()}</span>
        </h2>

        <div className="filter-container">
          <DateFilter onFilter={handleFilter} label="Expense" />
          {expenses.length > 0 && (
            <button className="reset-button" type="button" onClick={resetFilter}>
              Reset Filter
            </button>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.length === 0 ? (
              <p>No expenses found for the selected filter.</p>
            ) : (
              expenses.map((expense) => {
                const { _id, title, amount, date, category, description, type, source } = expense;
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                    source={source || 'manual'}
                  />
                );
              })
            )}
          </div>
        </div>
      </InnerLayout>
    </div>
  );
}

export default Expenses;
