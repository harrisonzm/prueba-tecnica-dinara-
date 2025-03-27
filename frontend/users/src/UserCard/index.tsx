import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  CircularProgress,
} from '@mui/material';

import { User, UserFieldLabels } from '../utils/user.types';
import axios, { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';

interface UserCardProps {
  user?: User;
  idUser?: string;
  onChange?: ()=>void;
}

export const UserCard: React.FC<UserCardProps> = ({ user: initialUser, idUser, onChange }) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(!initialUser);
  const navigate = useNavigate(); // Hook para navegación

  useEffect(() => {
    const fetchUser = async () => {
      console.log()
      if (!idUser) return;
      setIsLoading(true);
      try {
        const res: AxiosResponse<User> = await axios.get(`http://localhost:3000/api/users/student/${idUser}`);
        setUser(res.data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [idUser]);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      if (user) await axios.delete(`http://localhost:3000/api/users/student/${user.id}`);
      if (idUser) navigate("/users"); // Redirige sin recargar la página
      if (onChange)onChange();
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const redirect = ()=>{
    if(user)navigate(`/users/${user.id}`);
    
  } 


  if (isLoading) {
    return (
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3, p: 2, textAlign: 'center' }}>
        <CardContent>
          <CircularProgress />
          <Typography variant="body2">Cargando usuario...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (error || !user) {
    return (
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3, p: 2, textAlign: 'center' }}>
        <CardContent>
          <Typography variant="body2" color="error">
            Error al cargar el usuario.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    
    <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {user.fullName}
        </Typography>
        <Grid container spacing={1}>
          {Object.keys(user).map((key) => {
            const fieldKey = key as keyof User;
            return (
              <Grid item xs={12} sm={6} key={fieldKey}>
                <Typography variant="body2">
                  <strong>{UserFieldLabels[fieldKey]}:</strong>{' '}
                  {fieldKey === 'birthDate' ? new Date(user.birthDate).toLocaleDateString() : user[fieldKey]}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </CardActions>
      <CardActions>
          <Button size="small" color="primary" onClick={redirect} >
            ver detalles del estudiante
          </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
