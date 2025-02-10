import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [studentId, setStudentId] = useState("");
  const [semester, setSemester] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Navigation function

  // Map semester names to IDs
  const semesterValues = { Spring: "1", Summer: "2", Fall: "3" };
  const semesterId = year.slice(-2) + semesterValues[semester];

  const fetchResults = async () => {
    if (!studentId || !semester || !year) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/result?grecaptcha&semesterId=${semesterId}&studentId=${studentId}`)

      const result = await response.json();

      if (!result || result.length === 0) {
        setError("No results found.");
      } else {
        // Navigate to Cgpa page and pass data
        navigate("/cgpa", { state: { studentId, data: result } });
      }
    } catch (err) {
      setError("Failed to fetch results. Please try again.");
    }
    setLoading(false);
  };
 

  return (
    <div className="p-4">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Check Student Result</h1>
            <p className="py-6">Enter your information to get results.</p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Semester</span>
                </label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="input input-bordered"
                >
                  <option value="" disabled>Choose Semester</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Fall">Fall</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Year</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Year"
                  className="input input-bordered"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Student ID</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Student ID"
                  className="input input-bordered"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="button"
                  onClick={fetchResults}
                  disabled={loading}
                  className="px-4 py-2 bg-green-400 text-black font-semibold rounded btn-primary"
                >
                  {loading ? "Fetching..." : "SGPA"}
                </button>
              </div>
              <p>---------------------------------------------------------</p>
              
              <p 
        className="text-blue-500 text-center mt-4 cursor-pointer hover:underline" 
        onClick={() => navigate("/about")}
      >
        See the Overall Cgpa.
      </p>
            </form>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-center mt-3">{error}</p>}
    </div>
  );
};

export default Home;
