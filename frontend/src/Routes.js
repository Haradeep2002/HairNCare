import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
const Signin = lazy(() => import('./user/Signin'));
const Signup = lazy(() => import('./user/Signup'));
const Home = lazy(() => import('./core/Home'));
const PrivateRoute = lazy(() => import('./auth/PrivateRoute'));
const Dashboard = lazy(() => import('./user/UserDashboard'));
const AdminRoute = lazy(() => import('./auth/AdminRoute'));
const AdminDashboard = lazy(() => import('./user/AdminDashboard'));
const AddCategory = lazy(() => import('./admin/AddCategory'));
const AddProduct = lazy(() => import('./admin/AddProduct'));
const ProductImage = lazy(() => import('./admin/ProductImage'));
const Shop = lazy(() => import('./core/Shop'));
const Product = lazy(() => import('./core/Product'));
const Cart = lazy(() => import('./core/Cart'));
const Orders = lazy(() => import('./admin/Orders'));
const Profile = lazy(() => import('./user/Profile'));
const Help = lazy(() => import('./core/Help'));
const Hairfall = lazy(() => import('./help/Hairfall'));
const ManageProducts = lazy(() => import('./admin/ManageProducts'));
const UpdateProduct = lazy(() => import('./admin/UpdateProduct'));
const Dandruff = lazy(() => import('./help/Dandruff'));
const Thin = lazy(() => import('./help/Thin'));
const Split = lazy(() => import('./help/Split'));
const Baldness = lazy(() => import('./help/Baldness'));
const Growth = lazy(() => import('./help/Growth'));
const Blog = lazy(() => import('./core/Blog'));
const NotFound = lazy(() => import('./notfound'));


const Routes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div style={{ backgroundColor: '#001233' }}>
                <h1 style={{ color: '#EFE0CA' }}>Loading...</h1>
            </div>}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route path="/shop" exact component={Shop}></Route>
                    <Route path="/signin" exact component={Signin}></Route>
                    <Route path="/signup" exact component={Signup}></Route>
                    <Route path="/Hairfall" exact component={Hairfall}></Route>
                    <Route path="/Growth" exact component={Growth}></Route>
                    <Route path="/Split" exact component={Split}></Route>
                    <Route path="/Dandruff" exact component={Dandruff}></Route>
                    <Route path="/Baldness" exact component={Baldness}></Route>
                    <Route path="/Thin" exact component={Thin}></Route>
                    <Route path="/help" exact component={Help}></Route>
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
                    <Route component={NotFound} ></Route>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default Routes;
