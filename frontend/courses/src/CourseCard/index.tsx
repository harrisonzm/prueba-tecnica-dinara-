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
import { Course } from '../utils/courses.types';
import { CircularProgress, Box } from '@mui/material';
interface CourseCardProps {
  course: Course;
  onUpdated?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onUpdated }) => {
  const [open, setOpen] = useState(false);
  const [limit, setLimit] = useState(course.limit);
  const [loading, setLoading] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLimit(course.limit);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:3000/api/courses/${course.id}`, {
        limit
      });
      if (onUpdated) onUpdated(); // refresca la lista desde el padre
      setOpen(false);
    } catch (error) {
      console.error('Error updating course limit:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/courses/${course.id}`);
      if (onUpdated) onUpdated(); // refresca la lista desde el padre
      setOpen(false);
    } catch (error) {
      console.error('Error updating course limit:', error);
    }
    
  }

  return (
    <>
    {loading ?
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>:
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {course.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>ID:</strong> {course.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Limit:</strong> {course.limit}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Students:</strong> {course.students}
          </Typography>
        </CardContent>
        <div style={{display:"flex", alignContent:"space-between"}}>

        <CardActions>
          <Button size="small" color="primary" onClick={handleEditClick}>
            Edit
          </Button>
        </CardActions>
        <CardActions>
          <Button size="small" color="primary" onClick={handleDeleteClick} >
            DELETE
          </Button>
        </CardActions>
        </div>
      </Card>
      }

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Course Limit</DialogTitle>
        <DialogContent>
          <TextField
            label="Limit"
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            fullWidth
            inputProps={{ min: 0 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            color="primary"
            disabled={loading}
            variant="contained"
          >
            {loading ? 'Updating...' : 'Editar'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseCard;
