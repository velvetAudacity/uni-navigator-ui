import React, { useState } from 'react';

function ChanceCalculator() {
  // State for the form inputs
  const [grade, setGrade] = useState("2.0");
  const [language, setLanguage] = useState("C1");
  
  
  const [chance, setChance] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setChance(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict_chances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          grade: parseFloat(grade), 
          language_level: language, 
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      setChance(data.admitted_chance_percent); // Save the result
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-section">
      <h3>Admission Chance Calculator</h3>
      <p>Enter your stats to predict your admission chance for a competitive course.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Grade (1.0 - 4.0):</label>
          <input
            type="number"
            step="0.1"
            min="1.0"
            max="4.0"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Language Level:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Calculate Chance"}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {chance !== null && (
        <div className="chance-result">
          <h4>Predicted Admission Chance:</h4>
          <p className="chance-percent">{chance}%</p>
        </div>
      )}
    </div>
  );
}

export default ChanceCalculator;