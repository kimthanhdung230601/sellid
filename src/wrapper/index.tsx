import { Route, Routes } from "react-router-dom";
import Layout from "../pages/layout/Layout";

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
