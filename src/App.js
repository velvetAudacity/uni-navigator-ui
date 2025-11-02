import React, { useState, useEffect } from 'react';
import './App.css'; 

import CourseRecommender from './CourseRecommender';
import ChanceCalculator from './ChanceCalculator';

function App() {
  
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);     

  
  useEffect(() => {
    
    async function fetchCourses() {
      try {
        const response = await fetch('http://127.0.0.1:8000/courses');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setCourses(data); // Save the data in our state
        setError(null);
      } catch (err) {
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses(); // Run the function
  }, []); 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Uni-Navigator 🇩🇪</h1>
        <p>Your guide to German Universities</p>
      </header>

      <div className="course-list">
        <h2>Available Courses</h2>
        
        {/* Show a loading message */}
        {loading && <p>Loading courses...</p>}
        
        {/* Show an error message if something broke */}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        
        {/* Show the list of courses */}
        {courses.map(course => (
          <div key={course.course_id} className="course-card">
            <h3>{course.course_name}</h3>
            <p>{course.university_name}, {course.city}</p>
            <p>{course.description}</p>
            <span className="language-tag">{course.language}</span>
          </div>
        ))}
      </div>

      <div className="main-content">
        <div className="left-panel">
          <CourseRecommender />
          <ChanceCalculator />
        </div>
        
        <div className="right-panel">
          <div className="course-list">
            <h2>Available Courses</h2>
            {loading && <p>Loading courses...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            
            {courses.map(course => (
              <div key={course.course_id} className="course-card">
                <h3>{course.course_name}</h3>
                <p>{course.university_name}, {course.city}</p>
                <p>{course.description}</p>
                <span className="language-tag">{course.language}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default App;

