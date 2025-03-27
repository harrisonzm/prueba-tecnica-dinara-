import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import axios from 'axios';
import { Inscription } from '../utils/index.types';

interface InscriptionCardProps {
  inscription: Inscription;
  onDeleted?: () => void;
}

export const InscriptionCard: React.FC<InscriptionCardProps> = ({ inscription, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      await axios.delete<Inscription>(`http://localhost:3000/api/courses/inscriptions/?idUser=${inscription.idUser}&idCourse=${inscription.idCourse}`);
      if (onDeleted) onDeleted(); // refresca la lista desde el padre
    } catch (error) {
      console.error('Error updating course limit:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Id:{inscription.idUser}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Course Id:</strong> {inscription.idCourse}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleDeleteClick}>
            DELETE
          </Button>
        </CardActions>
      </Card>
      </>
    )
}
export default InscriptionCard;
