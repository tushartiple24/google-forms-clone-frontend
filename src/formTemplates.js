export const templates = [
  {
    label: "Student Feedback Form",
    questions: [
      { questionText: "Rate the quality of instruction", type: "choice", options: ["Excellent", "Good", "Average", "Poor"] },
      { questionText: "Favourite topic covered?", type: "text", options: [] }
    ]
  },
  {
    label: "Event Registration",
    questions: [
      { questionText: "Full Name", type: "text", options: [] },
      { questionText: "Select events", type: "choice", options: ["Coding", "Robotics", "Quiz"] }
    ]
  },
  {
    label: "Product Review",
    questions: [
      { questionText: "Rate your satisfaction", type: "choice", options: ["⭐️","⭐️⭐️","⭐️⭐️⭐️","⭐️⭐️⭐️⭐️","⭐️⭐️⭐️⭐️⭐️"] },
      { questionText: "Would you recommend us?", type: "choice", options: ["Yes", "No"] }
    ]
  }
];
