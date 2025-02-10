import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DisplayCalendar from "./calendar";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<DisplayCalendar />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
