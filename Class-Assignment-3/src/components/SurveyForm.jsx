import React, { useState } from 'react';
import toast from 'react-hot-toast';
import './SurveyForm.css';

const SurveyForm = () => {
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    rating: '5',
    favoriteTopic: 'React',
    feedback: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameTrimmed = formData.studentName.trim();
    const emailTrimmed = formData.email.trim().toLowerCase();

    // 1. Basic Required Field Check
    if (!nameTrimmed || !emailTrimmed) {
      toast.error('Please fill in all required fields!');
      return;
    }

    // 2. RVU Email Domain Validation
    const rvuEmailRegex = /^[a-zA-Z0-9._%+-]+@rvu\.edu\.in$/;
    if (!rvuEmailRegex.test(emailTrimmed)) {
      toast.error('Only RVU email addresses (@rvu.edu.in) are allowed!');
      return;
    }

    // 3. Success Toast
    toast.success(`Thank you, ${nameTrimmed}! Your survey response has been saved.`);

    // 4. Reset Form State
    setFormData({
      studentName: '',
      email: '',
      rating: '5',
      favoriteTopic: 'React',
      feedback: '',
    });
  };

  return (
    <div className="form-card">
      <h2>Full-Stack Course Experience Survey</h2>
      <p>Please use your official RVU student email to complete this survey.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="studentName">Full Name *</label>
          <input
            type="text"
            id="studentName"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="e.g., Alex Johnson"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">RVU Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., alex.j@rvu.edu.in"
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Overall Course Rating (1-5)</label>
          <select id="rating" name="rating" value={formData.rating} onChange={handleChange}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Very Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Poor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="favoriteTopic">Favorite Topic</label>
          <select
            id="favoriteTopic"
            name="favoriteTopic"
            value={formData.favoriteTopic}
            onChange={handleChange}
          >
            <option value="HTML/CSS">HTML & CSS Layouts</option>
            <option value="JavaScript">JavaScript Core & ES6</option>
            <option value="React">React & State Management</option>
            <option value="Node/Express">Node.js & Express APIs</option>
            <option value="Database">MongoDB / PostgreSQL</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="feedback">Detailed Experience / Suggestions</label>
          <textarea
            id="feedback"
            name="feedback"
            rows="4"
            value={formData.feedback}
            onChange={handleChange}
            placeholder="What went well? What can we improve?"
          />
        </div>

        <button type="submit" className="submit-btn">
          Submit Survey
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;