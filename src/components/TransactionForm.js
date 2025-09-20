import React, { useState, useEffect } from 'react';
import { getMembers, getGames } from '../services/api';
import { createTransaction } from '../services/api';

const TransactionForm = () => {
  const [members, setMembers] = useState([]);
  const [games, setGames] = useState([]);
  const [formData, setFormData] = useState({
    memberId: '',
    gameId: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchMembers();
    fetchGames();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
  };

  const fetchGames = async () => {
    try {
      const response = await getGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleGameChange = (e) => {
    const gameId = e.target.value;
    const game = games.find(g => g.id === gameId);
    setFormData({
      ...formData,
      gameId,
      amount: game ? game.price : ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(formData);
      alert('✅ Transaction successful!');
      setFormData({
        memberId: '',
        gameId: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error processing transaction:', error);
      alert('❌ Error processing transaction');
    }
  };

  return (
    <div className="container mt-4 fade-in">
      <h2>🔄 Game Transaction</h2>
      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label>Member</label>
                <select
                  className="form-control"
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} (Balance: ${member.balance.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Game</label>
                <select
                  className="form-control"
                  name="gameId"
                  value={formData.gameId}
                  onChange={handleGameChange}
                  required
                >
                  <option value="">Select Game</option>
                  {games.filter(game => game.active).map((game) => (
                    <option key={game.id} value={game.id}>
                      {game.name} (Price: ${game.price.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Amount (multiple of game price)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-4">
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-8 d-flex align-items-end">
              <button type="submit" className="btn btn-primary">
                🔄 Process Transaction
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;