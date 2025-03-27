import React, { useState } from 'react';
import { fieldTypes, genderOptions, initialFormState, User, UserFieldLabels } from '../utils/user.types';
import axios, { AxiosResponse } from 'axios';
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  MenuItem,
  Alert,
} from '@mui/material';




export const CreateUserForm:React.FC<{ onUserCreated?: () => void }> = ({ onUserCreated }) => {
  const [form, setForm] = useState<User>(initialFormState);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if(error && name ==="id") setError(false);
    if(success) setSuccess(false);
  };

  const handleSubmit = async(e: React.FormEvent) => {
    try{
      e.preventDefault();
      console.log("el nuevo user", form)
      await axios.post("http://localhost:3000/api/users/student/",form);
      setSuccess(true);
      if(onUserCreated) onUserCreated();
    }catch(error){
      setError(true);

    }
  };

  return (
    <Container maxWidth="sm" sx={{ overflow: 'auto', maxWidth: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Create User
      </Typography>
      {error&& <Alert severity='warning'> El usuario con correos, id y nombre puestos ya existe </Alert>}
      {success&& <Alert severity='success'> El usuario con Id: {form.id} ha sido creado </Alert>}
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {Object.keys(form).map((key) => {
            const fieldKey = key as keyof User;
            return (
              <Grid item xs={12} sm={fieldKey === 'gender' ? 6 : 12} key={fieldKey}>
                {fieldTypes[fieldKey] === 'select' ? (
                  <TextField
                    label={UserFieldLabels[fieldKey]}
                    name={fieldKey}
                    select
                    value={form[fieldKey]}
                    onChange={handleChange}
                    fullWidth
                    required
                  >
                    {genderOptions.map((option) => (
                      <MenuItem key={option} value={option.toLowerCase()}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : (
                  <TextField
                    label={UserFieldLabels[fieldKey]}
                    name={fieldKey}
                    type={fieldTypes[fieldKey]}
                    value={form[fieldKey]}
                    onChange={handleChange}
                    fullWidth
                    required
                    InputLabelProps={fieldTypes[fieldKey] === 'date' ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            );
          })}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={error}>
              Save User
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateUserForm;
