import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CreateInscriptionForm from "../CreateInscriptionForm";
import { Inscription } from "../utils/index.types";
import { Box, Card, CardContent, CircularProgress, Container, Typography } from "@mui/material";
import { InscriptionCard } from "../InscriptionCard";

const API_URL = "http://localhost:3000/api/courses/inscriptions/";

export const InscriptionsList = () => {
  const [Inscriptions, setInscriptions] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInscriptions = async () => {
    setLoading(true);
    try {
        const response:AxiosResponse = await axios.get(API_URL);
        setInscriptions(response.data);
    } catch (error) {
        console.error("Error fetching inscriptions:", error);
    }finally{
        setLoading(false);
    }
  };

  const onSuccesApiCall = async ()=>{
    await fetchInscriptions(); // Actualiza la lista cuando se crea un usuario
    
  }
  useEffect(() => {
    fetchInscriptions();
  }, []);

  return (
    <Container
    sx={{
      height: "80vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Box display="flex" gap="10%" width="100%" height="100%">
      {/* Cargando... */}
      {loading ? (
        <Box
          sx={{
            flex: 1, 
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        // Formulario de inscripción
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            maxHeight: "fit-content", // No crece más de lo necesario
          }}
        >
          <CardContent>
            <CreateInscriptionForm onCreation={onSuccesApiCall} />
          </CardContent>
        </Card>
      )}

      {/* Lista de inscripciones */}
      <Card
        sx={{
          flex: 1, 
          borderRadius: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          maxHeight:"70vh"
        }}
      >
        <CardContent
          sx={{
            flex: 1, // Permite que la lista crezca dentro del Card sin overflow
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Inscriptions List
          </Typography>
          <Box
            sx={{
              flex: 1, // Expande la lista dentro del CardContent
              overflow: "auto", // Permite scroll si hay muchas inscripciones
            }}
          >
            {Inscriptions.map((inscription: Inscription, index: number) => (
              <InscriptionCard key={index} inscription={inscription} onDeleted={onSuccesApiCall} />
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Container>
  );
};

export default InscriptionsList;
