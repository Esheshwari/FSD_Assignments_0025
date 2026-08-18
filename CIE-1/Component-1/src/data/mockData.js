const addDays = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const initialTasks = [
  {
    id: '1',
    title: 'Full Stack Development Lab Submission',
    subject: 'Full Stack Dev',
    description: 'Implement React application layout, state context, and analytical algorithms.',
    deadline: addDays(1),
    estimatedHours: 4,
    difficulty: 4,
    importance: 5,
    progress: 30,
    status: 'In Progress',
  },
  {
    id: '2',
    title: 'DBMS ER Diagram & Schema Design',
    subject: 'DBMS',
    description: 'Construct 3NF normalization structures for clinical domain backend.',
    deadline: addDays(1),
    estimatedHours: 3,
    difficulty: 3,
    importance: 4,
    progress: 10,
    status: 'Pending',
  },
  {
    id: '3',
    title: 'Probability Distributions Problem Set',
    subject: 'Statistics',
    description: 'Solve problem sets focusing on Normal and Binomial distributions.',
    deadline: addDays(3),
    estimatedHours: 2,
    difficulty: 3,
    importance: 3,
    progress: 0,
    status: 'Pending',
  },
  {
    id: '4',
    title: 'Software Engineering SRS Draft',
    subject: 'Software Eng',
    description: 'Compile IEEE format specifications document for term project.',
    deadline: addDays(5),
    estimatedHours: 5,
    difficulty: 2,
    importance: 4,
    progress: 60,
    status: 'In Progress',
  }
];