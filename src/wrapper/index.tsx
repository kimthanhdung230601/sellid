import { Route, Routes } from "react-router-dom";
import Account from "../pages/Account";
import Home from "../pages/Home";
import Layout from "../pages/layout/Layout";

const Wrapper = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<Home/>}> </Route>
      <Route path="/tai-khoan" element={<Account/>}> </Route>
      </Routes>
    </>
  );
};

export default Wrapper;
