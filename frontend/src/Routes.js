import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import ProductImage from './admin/ProductImage';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Blog from './core/Blog';

const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/shop" exact component={Shop}></Route>
                <Route path="/signin" exact component={Signin}></Route>
                <Route path="/signup" exact component={Signup}></Route>
                <PrivateRoute path="/user/dashboard" exact component={Dashboard}></PrivateRoute>
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}></AdminRoute>
                <AdminRoute path="/create/category" exact component={AddCategory}></AdminRoute>
                <AdminRoute path="/create/product" exact component={AddProduct}></AdminRoute>
                <AdminRoute path="/product/photo" exact component={ProductImage} />
                <Route path="/product/:id" exact component={Product}></Route>
                <Route path="/cart" exact component={Cart}></Route>
                <AdminRoute path="/admin/orders" exact component={Orders} />
                <PrivateRoute path="/profile/:userId" exact component={Profile}></PrivateRoute>
                <PrivateRoute path="/admin/products" exact component={ManageProducts}></PrivateRoute>
                <AdminRoute path="/admin/product/update/:id" exact component={UpdateProduct}></AdminRoute>
                <AdminRoute path="/admin/blog" exact component={Blog}></AdminRoute>
            </Switch>
        </BrowserRouter>
    )
}
  
export default Routes;
  