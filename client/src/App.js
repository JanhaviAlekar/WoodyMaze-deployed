import './App.css';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import About from './pages/About';
import { Contact } from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/auth/register';
import Login from './pages/auth/login';
import Dashboard from './pages/users/dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './pages/auth/forgot-password';
import AdminRoute from './components/Routes/adminRoute';
import AdminDashboard from './pages/Admin/adminDashboard';
import CreateCategory from './pages/Admin/createCategory';
import { Users } from './pages/Admin/users';
import Profile from './pages/users/profile';
import Orders from './pages/users/orders';
import CreateProduct from './pages/Admin/createProduct';
import Products from './pages/Admin/products';
import UpdateProduct from './pages/Admin/updateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/products/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
