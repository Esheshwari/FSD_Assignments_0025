import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

export const PriorityBadge = ({ priority, score }) => {
  const badgeClass = {
    URGENT: 'badge-urgent',
    MEDIUM: 'badge-medium',
    LOW: 'badge-low'
  }[priority] || 'badge-low';

  return (
    <span className={`badge ${badgeClass}`}>
      <span className="dot"></span>
      {priority} {score !== undefined && <span className="score">({score})</span>}
    </span>
  );
};

export const StatsCards = ({ metrics, urgentCount }) => {
  return (
    <div className="stats-grid">
      <div className="glass-card stat-card">
        <span className="stat-label">Total Assignments</span>
        <span className="stat-val">{metrics.totalTasks}</span>
      </div>
      <div className="glass-card stat-card">
        <span className="stat-label">Urgent Items</span>
        <span className="stat-val text-urgent">{urgentCount}</span>
      </div>
      <div className="glass-card stat-card">
        <span className="stat-label">Workload Left</span>
        <span className="stat-val">{metrics.remainingHours}h</span>
      </div>
      <div className="glass-card stat-card">
        <span className="stat-label">Completion Rate</span>
        <span className="stat-val text-low">{metrics.completionRate}%</span>
      </div>
    </div>
  );
};

export const EmptyState = ({ message = 'No pending assignments.' }) => (
  <div className="glass-card empty-state">
    <FiCheckCircle size={40} className="text-low" />
    <p>{message}</p>
  </div>
);