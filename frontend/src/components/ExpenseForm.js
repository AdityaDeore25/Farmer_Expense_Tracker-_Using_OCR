import React, { useState } from 'react';
import { createExpense } from '../services/expenseService';
import './ExpenseForm.css';

const ExpenseForm = ({ onExpenseAdded, userId }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Seeds');
  const [expenseDate, setExpenseDate] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    setLoading(true);
    try {
      const newExpense = {
        title,
        amount: parseFloat(amount),
        category,
        expenseDate: expenseDate || new Date().toISOString().split('T')[0],
        notes,
        userId
      };

      await createExpense(newExpense);
      setTitle('');
      setAmount('');
      setCategory('Seeds');
      setExpenseDate('');
      setNotes('');
      if (onExpenseAdded) onExpenseAdded();
    } catch (err) {
      console.error("Failed to add expense:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <h3>Add New Expense</h3>
      <div className="form-group">
        <label>Title</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="e.g., Fertilizer Purchase" 
          required 
        />
      </div>

      <div className="form-group">
        <label>Amount (₹)</label>
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          placeholder="0.00" 
          required 
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Seeds">Seeds</option>
          <option value="Fertilizers">Fertilizers</option>
          <option value="Pesticides">Pesticides</option>
          <option value="Equipment">Equipment</option>
          <option value="Labor">Labor</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date</label>
        <input 
          type="date" 
          value={expenseDate} 
          onChange={(e) => setExpenseDate(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Notes</label>
        <textarea 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Additional details..." 
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm;