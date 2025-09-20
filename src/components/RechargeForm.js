import React, { useState, useEffect } from 'react';
import { getMembers } from '../services/api';
import { createRecharge } from '../services/api';

const RechargeForm = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    memberId: '',
    amount: '',
    dateTime: new Date().toISOString().slice(0, 16)
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await getMembers();
      setMembers(response.data);
    } catch (error) {
      console.error('Error fetching members:', error);
    }
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
      await createRecharge(formData);
      alert('✅ Recharge successful!');
      setFormData({
        memberId: '',
        amount: '',
        dateTime: new Date().toISOString().slice(0, 16)
      });
    } catch (error) {
      console.error('Error processing recharge:', error);
      alert('❌ Error processing recharge');
    }
  };

  return (
    <div className="container mt-4 fade-in">
      <h2>💳 Member Recharge</h2>
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
                <label>Amount (100-2000)</label>
                <input
                  type="number"
                  min="100"
                  max="2000"
                  step="0.01"
                  className="form-control"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-4">
              <div className="form-group">
                <label>Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="dateTime"
                  value={formData.dateTime}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                💳 Process Recharge
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RechargeForm;