import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const StudentResults = () => {
  const [studentId, setStudentId] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data is fetched
  const semesterIds = [221, 222, 223, 231, 232, 233, 241, 242, 243, 251, 252, 253];
  
  const navigate = useNavigate();
  
  const fetchResults = async () => {
    if (!studentId) return;
    setLoading(true);
    setResults([]);
    setIsDataFetched(false); // Set to false while fetching
    try {
      const fetchPromises = semesterIds.map(async (semesterId) => {
        const response = await fetch(`/api/result?grecaptcha&semesterId=${semesterId}&studentId=${studentId}`);
        const data = await response.json();
        if (data.length > 0) {
          const totalCreditSum = data.reduce((sum, course) => sum + course.totalCredit, 0);
          return { semesterName: data[0].semesterName, cgpa: data[0].cgpa, totalCredit: totalCreditSum };
        }
        return null;
      });
      
      const data = await Promise.all(fetchPromises);
      const filteredData = data.filter(Boolean);
      setResults(filteredData);
      setIsDataFetched(true); // Set to true after data is fetched successfully
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const totalCredits = results.reduce((sum, result) => sum + result.totalCredit, 0);
  const weightedCgpa = totalCredits > 0 
    ? (results.reduce((sum, result) => sum + (parseFloat(result.cgpa) * result.totalCredit), 0) / totalCredits).toFixed(2)
    : "N/A";

  // Prepare data for the BarChart (all semesters)
  const chartData = results.map(result => ({
    name: result.semesterName,
    cgpa: parseFloat(result.cgpa)
  }));

  const cgpaPercentage = weightedCgpa === "N/A" ? 0 : (parseFloat(weightedCgpa) / 4) * 100; 

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-center">Student Results</h2>
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <div className="w-full flex justify-center items-center">
        <button onClick={fetchResults} className="px-4 py-2 bg-green-400 rounded text-center" disabled={loading}>
          {loading ? "Fetching..." : "Get Result"}
        </button>
      </div>

      {/* Conditionally render the content after data is fetched */}
      {isDataFetched && (
        <>
          <div className="flex justify-center items-center mt-6">
            <div style={{ width: 120, height: 120 }}>
              <CircularProgressbar
                value={cgpaPercentage}
                text={`${weightedCgpa}`}
                styles={buildStyles({
                  pathColor: '#4caf50', // Customize the color of the path
                  textColor: '#333', // Customize the text color
                  trailColor: '#f4f4f4', // Customize the trail color
                  strokeLinecap: 'round', // Make the ends of the progress bar rounded
                })}
              />
            </div>
          </div>

          <div className="text-center font-semibold text-lg mt-4">
            Overall CGPA: {weightedCgpa}
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Semester</th>
                <th className="border p-2">CGPA</th>
                <th className="border p-2">Total Credit</th>
              </tr>
            </thead>
            <tbody>
              {results.length > 0 ? (
                results.map((result, index) => (
                  <tr key={index} className="border">
                    <td className="border p-2 text-center">{result.semesterName}</td>
                    <td className="border p-2 text-center">{result.cgpa}</td>
                    <td className="border p-2 text-center">{result.totalCredit}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-2">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* BarChart displaying all CGPA values */}
          <div className="mt-6 border-2">
            <h3 className="text-center font-semibold">CGPA for Each Semester</h3>
            <ResponsiveContainer width="90%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis 
                  label={{ 
                    value: '', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: 14, fill: '#808080' } // Customize font size and color
                  }} 
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="cgpa" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      <div className="text-center mt-4">
        <button
          className="px-5 py-2 bg-green-400 rounded text-center"
          onClick={() => navigate("/")}
        >
          Go   Back
        </button>
      </div>
    </div>
  );
};

export default StudentResults;
