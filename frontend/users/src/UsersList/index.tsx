import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import CreateUserForm from "../CreateUserForm";
import { User } from "../utils/user.types";
import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import UserCard from "../UserCard";

const API_URL = "http://localhost:3000/api/users/student/";

export const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response:AxiosResponse = await axios.get(API_URL);
      console.log(response.data);
        setUsers(response.data);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Función que se pasará a `CreateUserForm`
  const whenApiCall = async() => {
    await fetchUsers(); // 🔄 Actualiza la lista cuando se crea un usuario
  };

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
    {/* Formulario de creación de usuario */}
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        maxHeight: "80vh", // Limita el tamaño del formulario
        width: "40%", // Ajuste de tamaño proporcional
      }}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", overflow:"auto" }}>
        <CreateUserForm onUserCreated={whenApiCall} />
      </CardContent>
    </Card>

    {/* Lista de usuarios */}
    <Card
      sx={{
        flex: 1,
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        maxHeight:"80vh",
        overflow:"auto"
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow:"auto"
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          User List
        </Typography>
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
          }}
        >
          {users.map((user: User) => (
            <UserCard key={user.id} user={user} onChange={whenApiCall}/>
          ))}
        </Box>
      </CardContent>
    </Card>
  </Box>
</Container>
  );
};

export default UsersList;
