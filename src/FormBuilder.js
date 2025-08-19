import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { templates } from "./formTemplates";
import { useForm, useFieldArray } from "react-hook-form";
import { Typography, Button, TextField, Select, MenuItem, Paper, Stack, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FormBuilder() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const templateIdx = params.get("template");
  const defaultQuestions = templateIdx !== null ? templates[templateIdx].questions : [];
  const defaultTitle = templateIdx !== null ? templates[templateIdx].label : "";

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      title: defaultTitle,
      questions: defaultQuestions
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "questions" });

  function onSubmit(data) {
    if (!data.title || data.questions.length === 0) {
      alert("Title & at least one question required"); return;
    }
    axios.post("https://your-render-backend-url.onrender.com/api/forms", data)
      .then(() => { alert("Form saved!"); navigate("/"); });
  }

  return (
    <Stack sx={{ p:3, maxWidth:600, mx:"auto" }} spacing={3} component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h4">Create a Form</Typography>
      <TextField {...register("title", { required: true })} label="Form Title" fullWidth required sx={{ mb:2 }} />
      <Typography variant="h6">Questions</Typography>
      {fields.map((item, idx) => (
        <Paper key={item.id} sx={{ p:2, mb:2, background: "#e9f7ef" }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <TextField {...register(`questions.${idx}.questionText`, { required: true })}
              label={`Question ${idx + 1}`} fullWidth />
            <Select {...register(`questions.${idx}.type`)} defaultValue={item.type||"text"}
                sx={{ minWidth: 120 }}>
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="choice">MCQ</MenuItem>
            </Select>
            <IconButton onClick={() => remove(idx)}><DeleteIcon /></IconButton>
          </Stack>
          { (item.type==="choice" || fields[idx].type==="choice") && (
            <TextField {...register(`questions.${idx}.optionsStr`)} label="Options (comma separated)"
              defaultValue={item.options ? item.options.join(",") : ""}
              fullWidth sx={{ mt:1 }}
              onBlur={e => {
                control._formValues.questions[idx].options = e.target.value.split(",").map(s=>s.trim());
              }}
            />
          )}
        </Paper>
      ))}
      <Button startIcon={<AddIcon />} variant="outlined"
        onClick={() => append({ questionText:"", type:"text", options:[] })}>
        Add Question
      </Button>
      <Button type="submit" variant="contained" color="success" sx={{ mt:2 }}>Save Form</Button>
    </Stack>
  );
}
