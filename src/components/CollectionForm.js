import React, { useState } from 'react';
import { createCollection } from '../services/api';

const CollectionForm = () => {
  const [formData, setFormData] = useState({
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

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
      await createCollection(formData);
      alert('Collection recorded successfully!');
      setFormData({
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error recording collection:', error);
      alert('Error recording collection');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Daily Collection</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Amount</label>
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
          <div className="col-md-6">
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
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary">Record Collection</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CollectionForm;