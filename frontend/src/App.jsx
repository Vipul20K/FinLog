


import React, { useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts.jsx';
import Orb from './Components/Orb/Orb.jsx';
import Navigation from './Components/Navigation/Navigation.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import Income from './Components/Income/Income.jsx';
import Expenses from './Components/Expenses/Expenses.jsx';
import Login from './Components/Login/Login.jsx';
import Signup from './Components/SignUp/SignUp.jsx';
import Analytics from './Components/Analytics/Analytics.jsx';
import ConnectWapp from './Components/ConnectWapp/ConnectWapp.jsx';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { useGlobalContext } from './context/globalContext.jsx';

function App() {
  const { user } = useGlobalContext();

  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <Router>
        <MainLayout>
          {user && <Navigation />}
          <main>
            <Routes>
              {/* Public Routes */}
              {!user && (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                   
                </>
              )}

              {/* Protected Routes */}
              {user && (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/income" element={<Income />} />
                  <Route path="/expenses" element={<Expenses />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<ConnectWapp user={user} />} />
                  
                  
                  <Route path="*" element={<Navigate to="/" />} />
                 
                </>
              )}
            </Routes>
          </main>
        </MainLayout>
      </Router>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
