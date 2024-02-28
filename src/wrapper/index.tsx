import { Route, Routes } from "react-router-dom";
import Layout from "../pages/admin/layout/Layout";

const Wrapper = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Layout/>}> </Route>
      </Routes>
    </>
  );
};

export default Wrapper;
