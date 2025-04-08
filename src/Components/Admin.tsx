import { useEffect, useState } from "react";

export default function Admin() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch feedback data from the serverless function
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('/.netlify/functions/feedbacks');  // Adjust the URL if needed
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Show loading state while the data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Loading feedbacks...</p>
      </div>
    );
  }

  // Show error if fetching fails
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Feedbacks</h1>
      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        <ul className="w-full max-w-4xl">
          {feedbacks.map((feedback: any, index) => (
            <li key={index} className="bg-white p-4 mb-4 rounded-lg shadow-md">
              <p><strong>Name:</strong> {feedback.full_name}</p>
              <p><strong>Email:</strong> {feedback.email}</p>
              <p><strong>Feedback:</strong> {feedback.feedback}</p>
            </li>
          ))}
        </ul>
      )}

      {/* "By Kudhan" text at the bottom */}
      <div className="mt-auto text-center">
        <h3 className="text-gray-700">By Kudhan</h3>
      </div>
    </div>
  );
}
