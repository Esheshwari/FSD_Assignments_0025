import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PriorityBadge } from './UIComponents';
import { FiCheckCircle, FiTrash2, FiZap, FiPlus, FiX, FiClock } from 'react-icons/fi';

export const TaskCard = ({ task }) => {
  const { updateProgress, completeTask, deleteTask } = useApp();

  return (
    <div className={`glass-card task-card ${task.status === 'Completed' ? 'completed' : ''}`}>
      <div className="task-header">
        <span className="subject-tag">{task.subject}</span>
        <PriorityBadge priority={task.priorityData.priority} score={task.priorityData.score} />
      </div>
      <h4>{task.title}</h4>
      <p className="task-desc">{task.description}</p>

      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${task.progress}%` }}></div>
      </div>

      <div className="task-footer">
        <span className="due-text"><FiClock /> {task.deadline}</span>
        <div className="task-actions">
          <input
            type="range" min="0" max="100" step="10"
            value={task.progress}
            onChange={(e) => updateProgress(task.id, Number(e.target.value))}
          />
          {task.status !== 'Completed' && (
            <button className="icon-btn text-low" onClick={() => completeTask(task.id)}><FiCheckCircle size={18} /></button>
          )}
          <button className="icon-btn text-urgent" onClick={() => deleteTask(task.id)}><FiTrash2 size={18} /></button>
        </div>
      </div>
    </div>
  );
};

export const RecommendationCard = ({ task }) => {
  const { completeTask } = useApp();
  if (!task) return null;

  return (
    <div className="glass-card recommendation-card">
      <div className="rec-header">
        <span className="rec-tag"><FiZap /> RECOMMENDED NEXT ACTION</span>
        <PriorityBadge priority={task.priorityData.priority} score={task.priorityData.score} />
      </div>
      <h3>{task.title}</h3>
      <p className="rec-subject">{task.subject}</p>
      <div className="rec-reason"><strong>Reason:</strong> {task.priorityData.explanation}</div>
      <div className="rec-footer">
        <span>Est. Effort: {task.estimatedHours}h</span>
        <button className="btn-primary" onClick={() => completeTask(task.id)}>Mark Complete</button>
      </div>
    </div>
  );
};

export const AddTaskModal = ({ isOpen, onClose }) => {
  const { addTask } = useApp();
  const [form, setForm] = useState({
    title: '', subject: 'Full Stack Dev', description: '',
    deadline: new Date().toISOString().split('T')[0],
    estimatedHours: 2, difficulty: 3, importance: 3
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    addTask(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="glass-card modal-content">
        <div className="modal-header">
          <h3>Add Assignment</h3>
          <button className="icon-btn" onClick={onClose}><FiX size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="text" placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <div className="form-row">
            <input type="text" placeholder="Subject" required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
            <input type="date" required value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
          </div>
          <div className="form-row">
            <label>Est. Hours: {form.estimatedHours}h
              <input type="range" min="1" max="12" value={form.estimatedHours} onChange={e => setForm({ ...form, estimatedHours: Number(e.target.value) })} />
            </label>
            <label>Importance: {form.importance}/5
              <input type="range" min="1" max="5" value={form.importance} onChange={e => setForm({ ...form, importance: Number(e.target.value) })} />
            </label>
          </div>
          <textarea placeholder="Description" rows="3" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary">Add Assignment</button>
          </div>
        </form>
      </div>
    </div>
  );
};