import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions'
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/accomptes" element={<Accounts />} />
        <Route path="/transactions" element={<Transactions />} />
        
      </Routes>
    </Router>
  );
}

export default App;
