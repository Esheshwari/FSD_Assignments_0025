// Storage Utils
const STORAGE_KEY = 'deadline_ai_data_v2';

export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to load storage:', err);
    return null;
  }
};

export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save storage:', err);
  }
};

// Date & Deadline Analyzer
export const analyzeDeadline = (deadlineStr) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const due = new Date(deadlineStr);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.ceil((due - now) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { category: 'OVERDUE', daysLeft: diffDays, label: `${Math.abs(diffDays)}d overdue` };
  if (diffDays === 0) return { category: 'DUE_TODAY', daysLeft: 0, label: 'Due today' };
  if (diffDays === 1) return { category: 'DUE_TOMORROW', daysLeft: 1, label: 'Due tomorrow' };
  return { category: 'UPCOMING', daysLeft: diffDays, label: `Due in ${diffDays} days` };
};

// Priority Engine Calculation
export const calculatePriorityScore = (task, allTasks = []) => {
  const { daysLeft } = analyzeDeadline(task.deadline);

  // 1. Urgency Score (Max 40)
  let urgency = 5;
  if (daysLeft < 0) urgency = 40;
  else if (daysLeft === 0) urgency = 38;
  else if (daysLeft === 1) urgency = 32;
  else if (daysLeft <= 3) urgency = 24;
  else if (daysLeft <= 7) urgency = 14;

  // 2. Effort & Importance Factors
  const remainingHours = task.estimatedHours * (1 - task.progress / 100);
  const effortScore = Math.min(20, remainingHours * 4);
  const importanceScore = (task.importance / 5) * 20;
  const difficultyScore = (task.difficulty / 5) * 10;

  // 3. Collision Bonus (Submissions on same date)
  const sameDay = allTasks.filter(t => t.deadline === task.deadline && t.id !== task.id && t.status !== 'Completed');
  const collisionBonus = Math.min(10, sameDay.length * 5);

  const score = Math.min(100, Math.round(urgency + effortScore + importanceScore + difficultyScore + collisionBonus));

  let priority = 'LOW';
  if (score >= 75) priority = 'URGENT';
  else if (score >= 45) priority = 'MEDIUM';

  let explanation = 'Standard submission timeline.';
  if (daysLeft <= 1 && remainingHours > 2) explanation = `Due soon with ${remainingHours}h remaining effort required.`;
  else if (collisionBonus > 0) explanation = `High submission load on ${task.deadline} (${sameDay.length + 1} tasks).`;
  else if (task.importance >= 4) explanation = `Heavy academic weighting (${task.importance}/5).`;

  return { score, priority, explanation, daysLeft, remainingHours };
};

// Workload Analytics Aggregator
export const calculateWorkloadMetrics = (tasks) => {
  const active = tasks.filter(t => t.status !== 'Completed');
  const completed = tasks.filter(t => t.status === 'Completed');

  const remainingHours = active.reduce((sum, t) => sum + (t.estimatedHours * (1 - t.progress / 100)), 0);
  const completionRate = tasks.length === 0 ? 0 : Math.round((completed.length / tasks.length) * 100);

  const subjectMap = tasks.reduce((acc, t) => {
    acc[t.subject] = (acc[t.subject] || 0) + t.estimatedHours;
    return acc;
  }, {});

  const subjectChartData = Object.entries(subjectMap).map(([subject, hours]) => ({ subject, hours }));

  return {
    totalTasks: tasks.length,
    activeCount: active.length,
    completedCount: completed.length,
    remainingHours: Math.round(remainingHours * 10) / 10,
    completionRate,
    subjectChartData
  };
};