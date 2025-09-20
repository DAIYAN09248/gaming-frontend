import React, { useState, useEffect } from 'react';
import { createMember, updateMember } from '../services/api';

const MemberForm = ({ member, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNo: '',
    age: '',
    balance: '',
    joiningDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        phoneNo: member.phoneNo,
        age: member.age,
        balance: member.balance,
        joiningDate: new Date(member.joiningDate).toISOString().split('T')[0]
      });
    }
  }, [member]);

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
      if (member) {
        await updateMember(member.id, formData);
      } else {
        await createMember(formData);
      }
      onSubmit();
      setFormData({
        name: '',
        phoneNo: '',
        age: '',
        balance: '',
        joiningDate: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error saving member:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-md-2">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              className="form-control"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Balance</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="balance"
              value={formData.balance}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Joining Date</label>
            <input
              type="date"
              className="form-control"
              name="joiningDate"
              value={formData.joiningDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            {member ? '✅ Update' : '➕ Add'} Member
          </button>
        </div>
      </div>
    </form>
  );
};

export default MemberForm;