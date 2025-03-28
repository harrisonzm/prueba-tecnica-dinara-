import ReactDOM from "react-dom/client";

import "./index.css";
import CreateInscriptionForm from "./CreateInscriptionForm";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Acá puedes inscribir un usuario a un curso, los usuarios y cursos que existan, apareceran en el dropdown</div>
    <CreateInscriptionForm/>
  </div>
);
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
