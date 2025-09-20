import React, { useState, useEffect } from 'react';
import { getGames, deleteGame } from '../services/api';
import GameForm from './GameForm';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [editingGame, setEditingGame] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await getGames();
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGame(id);
      fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
    }
  };

  const handleEdit = (game) => {
    setEditingGame(game);
  };

  const handleFormSubmit = () => {
    setEditingGame(null);
    fetchGames();
  };

  return (
    <div className="container mt-4 fade-in">
      <h2>🎯 Game Management</h2>
      <div className="card mb-4">
        <div className="card-header">
          Add / Edit Game
        </div>
        <div className="card-body">
          <GameForm game={editingGame} onSubmit={handleFormSubmit} />
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Min Players</th>
              <th>Max Players</th>
              <th>Multi Players</th>
              <th>Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.id}</td>
                <td>{game.name}</td>
                <td>${game.price.toFixed(2)}</td>
                <td>{game.description}</td>
                <td>{game.duration} min</td>
                <td>{game.minPlayCount}</td>
                <td>{game.maxPlayCount}</td>
                <td>{game.multiPlayCount}</td>
                <td>{game.active ? '✅ Yes' : '❌ No'}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(game)}>
                    ✏️ Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(game.id)}>
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

export default GameList;