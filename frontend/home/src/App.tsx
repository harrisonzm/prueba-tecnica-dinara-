import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Button } from '@mui/material';
import { GetIdFromPath} from './utils/GetIdFromPath';

// Importamos los componentes remotos vía Module Federation
const UsersList = React.lazy(() => import('users/UsersList'));
const UserCard = React.lazy(() => import('users/UserCard'));
const CreateUserForm = React.lazy(() => import('users/CreateUserForm'));

const CoursesList = React.lazy(() => import('courses/CoursesList'));
const CourseCard = React.lazy(() => import('courses/CourseCard'));
const CreateCourseForm = React.lazy(() => import('courses/CreateCourseForm'));

const CreateInscriptionForm = React.lazy(() => import('inscriptions/CreateInscriptionForm'));
const InscriptionsCard = React.lazy(() => import('inscriptions/InscriptionCard'));
const InscriptionsList = React.lazy(() => import('inscriptions/InscriptionsList'));



const theme = createTheme();

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <div style={{width:"100%", borderBottom:"1px solid", alignContent:"space-between", marginBottom: "5%" }}>

        <nav style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none', margin: '0 1rem' }}>
          <Button >Home</Button>
            </Link>
            <Link to="/users" style={{ textDecoration: 'none', margin: '0 1rem' }}>
          <Button>Users</Button>
            </Link>
            <Link to="/courses" style={{ textDecoration: 'none', margin: '0 1rem' }}>
          <Button>Courses</Button>
            </Link>
            <Link to="/inscriptions" style={{ textDecoration: 'none', margin: '0 1rem' }}>
          <Button>Inscriptions</Button>
            </Link>
        </nav>
      </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<h1>Home SPA</h1>} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <GetIdFromPath>
                    <UserCard />
                    <CoursesList />
                  </GetIdFromPath>
                </div>
              } />
            <Route path="/courses" element={<CoursesList />} />
            <Route path="/inscriptions" element={<InscriptionsList />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);
root.render(<App />);
