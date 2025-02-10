import { useLocation, useNavigate } from "react-router-dom";

const Cgpa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId, data } = location.state || {};

  if (!data) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">No data available.</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Results</h1>
      <div className="font-semibold my-3 text-gray-800 text-center">
        <p>ID: {studentId}</p>
        <p>SGPA: {data.length > 0 ? data[0].cgpa : "Not Available"}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead className="bg-green-400">
            <tr className="text-black">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Course Title</th>
              <th className="border px-4 py-2">Credit</th>
              <th className="border px-4 py-2">Grade</th>
              <th className="border px-4 py-2">CGPA</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="text-gray-700 border">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{item.courseTitle}</td>
                <td className="border px-4 py-2">{item.totalCredit}</td>
                <td className="border px-4 py-2">{item.gradeLetter}</td>
                <td className="border px-4 py-2">{item.pointEquivalent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mt-4">
        <button
          className="px-4 py-2 bg-green-400 text-black font-bold rounded"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Cgpa;
