import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Grid, Card, CardContent, CardActions, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { templates } from "./formTemplates"; // See next step!

export default function Home() {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/api/forms")
      .then((res) => setForms(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" sx={{ mb:4 }}>All Forms</Typography>
      <Grid container spacing={3}>
        {forms.map((form) => (
          <Grid item key={form._id} xs={12} sm={6} md={4}>
            <motion.div whileHover={{ scale: 1.04 }}>
              <Card sx={{ background: "linear-gradient(135deg,#e0eafc,#cfdef3)" }}>
                <CardContent>
                  <Typography variant="h6" color="text.primary">{form.title}</Typography>
                </CardContent>
                <CardActions>
                  <Button component={Link} to={`/form/${form._id}/fill`} variant="contained">Fill</Button>
                  <Button component={Link} to={`/form/${form._id}/analytics`} variant="outlined">Analytics</Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{ mt:6, mb:2 }}>Try a Built-In Template:</Typography>
      <Grid container spacing={2}>
        {templates.map((tpl, idx) => (
          <Grid item key={idx}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1">{tpl.label}</Typography>
                <Button component={Link} to={`/create?template=${idx}`} variant="contained" color="secondary">
                  Create
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
