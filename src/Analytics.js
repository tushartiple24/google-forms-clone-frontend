import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from "chart.js";
import { Typography, Paper, Box } from "@mui/material";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement);

export default function Analytics() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/forms/${id}`).then(res => setForm(res.data));
    axios.get(`http://localhost:5000/api/forms/${id}/responses`).then(res => setResponses(res.data));
  }, [id]);

  if (!form) return <Typography>Loading form data...</Typography>;
  if (responses.length === 0) return <Typography>No responses yet</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p:4 }}>
      <Typography variant="h4" sx={{ mb:4 }}>Analytics: {form.title}</Typography>
      {form.questions.map((q, i) => {
        if (q.type === "choice") {
          const counts = q.options.map(opt =>
            responses.filter(r => r.answers[i] === opt).length
          );
          const data = {
            labels: q.options,
            datasets: [{ label: q.questionText, data: counts, backgroundColor: "#3498db" }]
          };
          return (
            <Paper key={i} sx={{ mb:3, p: 2}}>
              <Typography variant="subtitle1">{q.questionText}</Typography>
              <Bar data={data} />
              <Pie data={{
                labels: q.options,
                datasets: [{ data: counts, backgroundColor: ["#e74c3c", "#2ecc71", "#3498db", "#f39c12"] }]
              }} />
            </Paper>
          );
        } else {
          return (
            <Paper key={i} sx={{ mb:3, p:2 }}>
              <Typography variant="subtitle1">{q.questionText} (Text responses)</Typography>
              <ul>
                {responses.map((r, idx) => <li key={idx}>{r.answers[i]}</li>)}
              </ul>
            </Paper>
          );
        }
      })}
      <Typography variant="body1" sx={{ mt: 2 }}>Total responses: {responses.length}</Typography>
    </Box>
  );
}
