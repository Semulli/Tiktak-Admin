// import Navbar from "./common/components/Navbar";
import { Route, Routes } from "react-router";
import AdminLogin from "./pages/login";
import { ROUTER } from "./constant/router";
// import Companies from "./pages/companies";
import Categories from "./pages/categories";
import Products from "./pages/products";
import Orders from "./pages/orders";
import Users from "./pages/users";
import Companies from "./pages/companies";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path={ROUTER.LOGIN} element={<AdminLogin />} />
        <Route path={ROUTER.USERS} element={<Users />} />
        <Route path={ROUTER.COMPANIES} element={<Companies />} />
        <Route path={ROUTER.CATEGORIES} element={<Categories />} />
        <Route path={ROUTER.PRODUCTS} element={<Products />} />
        <Route path={ROUTER.ORDERS} element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
