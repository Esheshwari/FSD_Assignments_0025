import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculateWorkloadMetrics } from '../utils/helpers';
import { StatsCards, EmptyState } from '../components/UIComponents';
import { TaskCard, RecommendationCard, AddTaskModal } from '../components/TaskComponents';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { FiPlus, FiSearch } from 'react-icons/fi';

export const Home = () => {
  const { tasks, activeTab } = useApp();
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const metrics = calculateWorkloadMetrics(tasks);
  const activeTasks = tasks.filter(t => t.status !== 'Completed');
  const urgentCount = activeTasks.filter(t => t.priorityData.priority === 'URGENT').length;
  const filteredTasks = tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h2>Workload Hub</h2>
          <p className="subtitle">Algorithmic prioritization for academic performance.</p>
        </div>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}><FiPlus /> Add Assignment</button>
      </div>

      <StatsCards metrics={metrics} urgentCount={urgentCount} />

      {activeTab === 'dashboard' && (
        <div className="dashboard-layout">
          <div className="main-col">
            {activeTasks.length > 0 && <RecommendationCard task={activeTasks[0]} />}
            
            <div className="glass-card chart-card">
              <h4>Workload per Subject (Hours)</h4>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={metrics.subjectChartData}>
                  <XAxis dataKey="subject" stroke="var(--text-muted)" fontSize={12} />
                  <YAxis stroke="var(--text-muted)" fontSize={12} />
                  <Tooltip contentStyle={{ background: 'var(--bg-card)', borderRadius: '8px' }} />
                  <Bar dataKey="hours" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <h4>Pending Submissions</h4>
            {activeTasks.length === 0 ? <EmptyState /> : activeTasks.map(t => <TaskCard key={t.id} task={t} />)}
          </div>
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="tasks-view">
          <div className="glass-card search-bar">
            <FiSearch color="var(--text-muted)" />
            <input type="text" placeholder="Search assignments..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          {filteredTasks.length === 0 ? <EmptyState message="No matching tasks." /> : (
            <div className="tasks-grid">
              {filteredTasks.map(t => <TaskCard key={t.id} task={t} />)}
            </div>
          )}
        </div>
      )}

      {activeTab === 'next-actions' && (
        <div className="actions-view">
          {activeTasks.length === 0 ? <EmptyState /> : activeTasks.map(t => <RecommendationCard key={t.id} task={t} />)}
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="analytics-view">
          <div className="glass-card chart-card">
            <h4>Subject Hour Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={metrics.subjectChartData}>
                <XAxis dataKey="subject" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" />
                <Tooltip />
                <Bar dataKey="hours" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};