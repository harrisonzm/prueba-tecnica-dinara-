import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { CourseWithoutStudents, initializeCourseForm, labelCourseForm } from '../utils/courses.types';

export const CreateCourseForm: React.FC<{ onCourseCreated: () => void }> = ({ onCourseCreated }) => {
  const [form, setForm] = useState(initializeCourseForm);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'limit' ? value.replace(/\D/, '') : value, // solo números para limit
    }));
    if (error && name === 'id') setError(true);
    if (success) setSuccess(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      console.log('Creating course:', { ...form });
      const sendForm = {...form,limit: Number(form.limit)}
      await axios.post(`http://localhost:3000/api/courses/`, sendForm);
      onCourseCreated();
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Container maxWidth="sm">
      {error&&<Alert severity="warning">EL usuario ya está Inscrito al curso </Alert>}
      {success&&<Alert severity="success">EL usuario se ha Inscrito al curso </Alert>}
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Create Course
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(initializeCourseForm).map((key, index) => {
            const field = key as keyof CourseWithoutStudents;
            return (
              <Grid item xs={12} key={index}>
                <TextField
                  label={labelCourseForm[field]}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  fullWidth
                  required={true}
                  type={field === "limit" ? "number" : "text"}
                />
              </Grid>
            );
          })}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Save Course
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateCourseForm;
