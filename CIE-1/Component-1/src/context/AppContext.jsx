import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTasks } from '../data/mockData';
import { loadFromStorage, saveToStorage, calculatePriorityScore } from '../utils/helpers';
import toast from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [tasks, setTasks] = useState(() => loadFromStorage() || initialTasks);
  const [theme, setTheme] = useState(() => localStorage.getItem('deadline_theme') || 'light');
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    saveToStorage(tasks);
  }, [tasks]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('deadline_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const processedTasks = tasks.map(t => ({
    ...t,
    priorityData: calculatePriorityScore(t, tasks)
  })).sort((a, b) => b.priorityData.score - a.priorityData.score);

  const addTask = (newTask) => {
    const item = { ...newTask, id: Date.now().toString(), progress: 0, status: 'Pending' };
    setTasks(prev => [item, ...prev]);
    toast.success('Assignment added!');
  };

  const updateProgress = (id, progress) => {
    setTasks(prev => prev.map(t => t.id === id ? {
      ...t,
      progress,
      status: progress === 100 ? 'Completed' : 'In Progress'
    } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    toast.error('Assignment deleted');
  };

  const completeTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, progress: 100, status: 'Completed' } : t));
    toast.success('Assignment completed!');
  };

  return (
    <AppContext.Provider value={{
      tasks: processedTasks,
      theme,
      toggleTheme,
      activeTab,
      setActiveTab,
      addTask,
      updateProgress,
      deleteTask,
      completeTask
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);