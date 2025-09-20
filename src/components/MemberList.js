import React, { useState, useEffect } from 'react';
import { getMembers, deleteMember } from '../services/api';
import MemberForm from './MemberForm';

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [editingMember, setEditingMember] = useState(null);

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

  const handleDelete = async (id) => {
    try {
      await deleteMember(id);
      fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
  };

  const handleFormSubmit = () => {
    setEditingMember(null);
    fetchMembers();
  };

  return (
    <div className="container mt-4 fade-in">
      <h2>👥 Member Management</h2>
      <div className="card mb-4">
        <div className="card-header">
          Add / Edit Member
        </div>
        <div className="card-body">
          <MemberForm member={editingMember} onSubmit={handleFormSubmit} />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Balance</th>
              <th>Joining Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.phoneNo}</td>
                <td>{member.age}</td>
                <td>${member.balance.toFixed(2)}</td>
                <td>{new Date(member.joiningDate).toLocaleDateString()}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(member)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(member.id)}>
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberList;