import React, { useState, useEffect } from 'react';
import { createGame, updateGame } from '../services/api';

const GameForm = ({ game, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    duration: '',
    minPlayCount: '',
    maxPlayCount: '',
    multiPlayCount: '',
    active: true
  });

  useEffect(() => {
    if (game) {
      setFormData({
        name: game.name,
        price: game.price,
        description: game.description,
        duration: game.duration,
        minPlayCount: game.minPlayCount,
        maxPlayCount: game.maxPlayCount,
        multiPlayCount: game.multiPlayCount,
        active: game.active
      });
    }
  }, [game]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (game) {
        await updateGame(game.id, formData);
      } else {
        await createGame(formData);
      }
      onSubmit();
      setFormData({
        name: '',
        price: '',
        description: '',
        duration: '',
        minPlayCount: '',
        maxPlayCount: '',
        multiPlayCount: '',
        active: true
      });
    } catch (error) {
      console.error('Error saving game:', error);
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
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Duration (min)</label>
            <input
              type="number"
              className="form-control"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Min Players</label>
            <input
              type="number"
              className="form-control"
              name="minPlayCount"
              value={formData.minPlayCount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Max Players</label>
            <input
              type="number"
              className="form-control"
              name="maxPlayCount"
              value={formData.maxPlayCount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Multi Players</label>
            <input
              type="number"
              className="form-control"
              name="multiPlayCount"
              value={formData.multiPlayCount}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-md-2">
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <div className="form-check mt-4">
            <input
              type="checkbox"
              className="form-check-input"
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
            <label className="form-check-label">Active</label>
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            {game ? '✅ Update' : '➕ Add'} Game
          </button>
        </div>
      </div>
    </form>
  );
};

export default GameForm;