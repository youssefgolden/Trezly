import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions'
import Dashboard from './components/Dashboard';
import './index.css';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Router>
      <Routes>

      <Route path="/" element={<Layout /> } >
        <Route index element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />        
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/accomptes" element={<Accounts />} />
      </Routes>

    </Router>
  );
}

export default App;
