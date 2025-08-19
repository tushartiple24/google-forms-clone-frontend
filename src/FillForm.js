import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Stack, Typography, TextField, RadioGroup, FormControlLabel, Radio, Button, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function FillForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get(`https://your-render-backend-url.onrender.com/api/forms/${id}`)
      .then(res => {
        setForm(res.data);
        setAnswers(Array(res.data.questions.length).fill(""));
      });
  }, [id]);

  function handleChange(i, value) {
    let newAnswers = [...answers];
    newAnswers[i] = value;
    setAnswers(newAnswers);
  }

  function submitAnswers() {
    axios.post(`https://your-render-backend-url.onrender.com/api/forms/${id}/responses`, { answers })
      .then(() => setSubmitted(true));
  }

  if (!form) return <Typography>Loading...</Typography>;
  if (submitted) return (
    <motion.div initial={{ scale:0.7 }} animate={{ scale:1 }}>
      <Paper sx={{ p:4, mx:"auto", mt:8, maxWidth:400, textAlign:"center" }}>
        <Typography variant="h4" color="success.main">✔ Thank You!</Typography>
        <Typography variant="body1" sx={{ mt:2 }}>Your response was recorded.</Typography>
      </Paper>
    </motion.div>
  );

  return (
    <Stack sx={{ maxWidth: 700, mx: "auto", p:3 }} spacing={3}>
      <Typography variant="h4">{form.title}</Typography>
      {form.questions.map((q, i) => (
        <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
        <Paper sx={{ p:2, background: "#f2f6fc", mb:2 }}>
          <Typography variant="subtitle1">{q.questionText}</Typography>
          {q.type === "text" ? (
            <TextField
              value={answers[i]}
              onChange={e => handleChange(i, e.target.value)}
              variant="outlined" fullWidth sx={{ mt: 1 }}
            />
          ) : (
            <RadioGroup
              value={answers[i]}
              onChange={e => handleChange(i, e.target.value)}
              sx={{ mt: 1, display: "flex", flexDirection: "row" }}
            >
              {q.options.map((opt, j) => (
                <FormControlLabel
                  key={j}
                  value={opt}
                  control={<Radio />}
                  label={opt}
                />
              ))}
            </RadioGroup>
          )}
        </Paper>
        </motion.div>
      ))}
      <Button variant="contained" onClick={submitAnswers} size="large">Submit</Button>
    </Stack>
  );
}
