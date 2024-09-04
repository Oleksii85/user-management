import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./components/404";
import FirstPage from "./components/pages/FirstPage";
import UsersTable from "./components/tables/UsersTable";

function App() {
  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/users" element={<UsersTable />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
