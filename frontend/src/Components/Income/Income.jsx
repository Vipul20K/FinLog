// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import { useGlobalContext } from '../../context/globalContext.jsx';
// import { InnerLayout } from '../../styles/Layouts.jsx';
// import Form from '../Form/Form.jsx';
// import IncomeItem from '../IncomeItem/IncomeItem.jsx';
// import DateFilter from '../DateFilter.jsx'; // Adjust path accordingly
// import { rupee } from '../../utils/Icons.jsx';

// function Income() {
//   const { incomes, getIncomes, deleteIncome, totalIncome, error } = useGlobalContext();

//   useEffect(() => {
//     getIncomes(); // fetch all incomes on mount
//   }, [getIncomes]);

//   // Handle filter by calling global context fetch with params
//   const handleFilter = ({ start, end }) => {
//     getIncomes(start, end);
//   };

//   // Reset filter to fetch all incomes again
//   const resetFilter = () => {
//     getIncomes();
//   };

//   return (
//     <IncomeStyled>
//       <InnerLayout>
//         {/* <h1>Incomes</h1> */}
//         <h2 className="total-income">
//           Total Income: <span>{rupee}{totalIncome()}</span>
//         </h2>

//         <FilterContainer>
//           <DateFilter onFilter={handleFilter} label="Income" />
//           {incomes.length > 0 && (
//             <ResetButton type="button" onClick={resetFilter}>
//               Reset Filter
//             </ResetButton>
//           )}
//         </FilterContainer>

//         {error && <p style={{ color: 'red' }}>{error}</p>}

//         <div className="income-content">
//           <div className="form-container">
//             <Form />
//           </div>
//           <div className="incomes">
//             {incomes.length === 0 ? (
//               <p>No incomes found for selected filter.</p>
//             ) : (
//               incomes.map(({ _id, title, amount, date, category, description, type, source }) => (
//                 <IncomeItem
//                   key={_id}
//                   id={_id}
//                   title={title}
//                   description={description}
//                   amount={amount}
//                   date={date}
//                   type={type}
//                   category={category}
//                   indicatorColor="var(--color-green)"
//                   deleteItem={deleteIncome}
//                   source={source || 'manual'}
//                 />
//               ))
//             )}
//           </div>
//         </div>
//       </InnerLayout>
//     </IncomeStyled>
//   );
// }

// const IncomeStyled = styled.div`
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

// // New styled-components for the filter container and reset button
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

// export default Income;

import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/globalContext.jsx';
import { InnerLayout } from '../../styles/Layouts.jsx';
import Form from '../Form/Form.jsx';
import IncomeItem from '../IncomeItem/IncomeItem.jsx';
import DateFilter from '../DateFilter.jsx';
import { rupee } from '../../utils/Icons.jsx';
import './Income.css';

function Income() {
  const { incomes, getIncomes, deleteIncome, totalIncome, error } = useGlobalContext();

  useEffect(() => {
    getIncomes(); // fetch all incomes on mount
  }, [getIncomes]);

  const handleFilter = ({ start, end }) => {
    getIncomes(start, end);
  };

  const resetFilter = () => {
    getIncomes();
  };

  return (
    <div className="income-page">
      <InnerLayout>
        <h2 className="total-income">
          Total Income: <span>{rupee}{totalIncome()}</span>
        </h2>

        <div className="filter-container">
          <DateFilter onFilter={handleFilter} label="Income" />
          {incomes.length > 0 && (
            <button
              type="button"
              className="reset-button"
              onClick={resetFilter}
            >
              Reset Filter
            </button>
          )}
        </div>

        {error && <p className="error-text">{error}</p>}

        <div className="income-content">
          <div className="form-container">
            <Form />
          </div>
          <div className="incomes">
            {incomes.length === 0 ? (
              <p>No incomes found for selected filter.</p>
            ) : (
              incomes.map(({ _id, title, amount, date, category, description, type, source }) => (
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
                  deleteItem={deleteIncome}
                  source={source || 'manual'}
                />
              ))
            )}
          </div>
        </div>
      </InnerLayout>
    </div>
  );
}

export default Income;
