import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import MemberList from './components/MemberList';
import GameList from './components/GameList';
import RechargeForm from './components/RechargeForm';
import TransactionForm from './components/TransactionForm';
import CollectionForm from './components/CollectionForm';
import CollectionList from './components/CollectionList';

function App() {
  return (
    <Router>
      <div >
        <nav className="navbar navbar-expand-lg bg-gradient-dark">
          <div className="container">
            <Link className="navbar-brand" to="/" style={{ color: 'black', fontWeight: 'bold' }}>🎮 Gaming Center Mohammed Daiyan</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
             <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/members" style={{ color: 'black' }}>👥 Members</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/games" style={{ color: 'black' }}>🎯 Games</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/recharge" style={{ color: 'black' }}>💳 Recharge</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/transaction" style={{ color: 'black' }}>🔄 Transaction</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/collection" style={{ color: 'black' }}>💰 Collection</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

          <Routes>
            <Route path="/" element={<MemberList />} />
            <Route path="/members" element={<MemberList />} />
            <Route path="/games" element={<GameList />} />
            <Route path="/recharge" element={<RechargeForm />} />
            <Route path="/transaction" element={<TransactionForm />} />
            <Route path="/collection" element={<>
              <CollectionForm />
              <CollectionList />
            </>} />
          </Routes>
          
      </div>
    </Router>
  );
}

export default App;