import ReactDOM from "react-dom/client";

import "./index.css";
import CourseList from "./CoursesList";

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <div>Name: courses</div>
    <div>Framework: react-19</div>
    <div style={{ display: 'flex', flexDirection:"column" }}>
      <CourseList/>
    </div>
  </div>
);
export default App;
const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
