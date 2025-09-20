import React, { useState, useEffect } from 'react';
import { getCollections } from '../services/api';

const CollectionList = () => {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await getCollections();
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  return (
    <div className="container mt-4 fade-in">
      <h2>💰 Collection Records</h2>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {collections.map((collection) => (
                  <tr key={collection.id}>
                    <td>{collection.id}</td>
                    <td>{new Date(collection.date).toLocaleDateString()}</td>
                    <td>${collection.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionList;