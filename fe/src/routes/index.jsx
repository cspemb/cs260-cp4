import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Room from "./Room";
import { Layout } from "./components";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="room/:roomid" element={<Room />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
