import React, {useState} from 'react';

function CourseRecommender(){
    const [query, setQuery] = useState("");
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResults([]);

    try{
        const response = await fetch(`http://127.0.0.1:8000/recommend_courses?query=${query}`);
        if (!response.ok){
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setResults(data);
    } catch (err){
        setError(err.message);
    } finally{
        setLoading(false);
    }
  };

  return(
    <div className="recommender-section">
      <h3>Find Your Perfect Course</h3>
      <p>Tell us what you're interested in (e.g., "business and computers")</p>
      
      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your interests..."
          className="search-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Recommend"}
        </button>
      </form>

      {/* Results Section */}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      {results.length > 0 && (
        <div className="recommendation-results">
          <h4>Here are our top 3 recommendations:</h4>
          <ul>
            {results.map((course, index) => (
              <li key={index}>{course.course_name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CourseRecommender;