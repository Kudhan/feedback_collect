import fs from 'fs';
import path from 'path';

export async function handler(event, context) {
  const feedbacksFilePath = path.join(__dirname, '../../../', 'feedbacks.json');
  const feedbacksDirPath = path.dirname(feedbacksFilePath); // Get the directory path

  if (event.httpMethod === "GET") {
    try {
      // Check if the directory exists, if not, create it
      if (!fs.existsSync(feedbacksDirPath)) {
        fs.mkdirSync(feedbacksDirPath, { recursive: true });
      }

      // Check if the file exists, if not, create it with an empty array
      if (!fs.existsSync(feedbacksFilePath)) {
        console.log("Creating feedbacks.json file");
        fs.writeFileSync(feedbacksFilePath, JSON.stringify([], null, 2));
      }

      // Read existing feedbacks from the file
      const existingFeedbacks = JSON.parse(fs.readFileSync(feedbacksFilePath, "utf-8"));

      console.log(existingFeedbacks)

      // Return the feedbacks as a JSON array in the response body
      return {
        statusCode: 200,
        body: JSON.stringify(existingFeedbacks),
      };
    } catch (error) {
      console.error("Error reading feedback:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Server error. Please try again later." }),
      };
    }
  }

  // If the method is not GET, return 405 Method Not Allowed
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
}
