import fs from 'fs';
import path from 'path';

export async function handler(event, context) {
  const feedbacksFilePath = path.join(__dirname, '../../../', 'feedbacks.json');
  console.log(feedbacksFilePath)
  const feedbacksDirPath = path.dirname(feedbacksFilePath); // Get the directory path

  if (event.httpMethod === "POST") {
    const feedbackData = JSON.parse(event.body);

    // Validation (optional)
    if (!feedbackData.full_name || !feedbackData.feedback || !feedbackData.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Full name, email, and feedback are required." }),
      };
    }

    try {
      // Ensure that the directory exists, create if it doesn't
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

      // Add the new feedback to the array
      existingFeedbacks.push(feedbackData);

      // Write the updated feedbacks back to the file
      fs.writeFileSync(feedbacksFilePath, JSON.stringify(existingFeedbacks, null, 2));

      console.log(existingFeedbacks)

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Feedback submitted successfully!" }),
      };
    } catch (error) {
      console.error("Error writing feedback:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Server error. Please try again later." }),
      };
    }
  }

  // If the method is not POST, return 405 Method Not Allowed
  return {
    statusCode: 405,
    body: JSON.stringify({ message: "Method Not Allowed" }),
  };
}
