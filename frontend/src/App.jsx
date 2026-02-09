import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Account from './components/Account'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import CheckOut from './components/CheckOut'
import Show from './components/Show'
import {default as FrontOrderDetail} from './components/OrderDetail'
import AdminLogin from './components/Admin/Login'
import Dashboard from './components/Admin/Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import { AdminRequireAuth } from './components/Admin/AdminRequireAuth'
import { default as CreateCategories } from './components/Admin/category/Create';
import { default as ShowCategories } from './components/Admin/category/Show';
import { default as EditCategories } from './components/Admin/category/Edit';

import { default as CreateBrand } from './components/Admin/brand/Create';
import { default as ShowBrand } from './components/Admin/brand/Show';
import { default as EditBrand } from './components/Admin/brand/Edit';


import { default as CreateProduct } from "./components/Admin/product/Create";
import { default as ShowProduct } from './components/Admin/product/Show';
import { default as EditProduct } from './components/Admin/product/Edit';

import {default as ShowOrder } from './components/Admin/order/Show';
import {default as  OrderDetail} from './components/Admin/order/OrderDetail'


import Layout from './components/common/Layout';


import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { UserRequireAuth } from './components/UserRequireAuth'
import OrderConfirmation from './components/OrderConfirmation'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Layout> <Shop /></Layout>} />    {/*  here wraped the shop page layout cause categy used same in to the sop page */}
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/checkout" element={<CheckOut />} /> */}
          <Route path="/admin/login" element={<AdminLogin />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
         
          <Route path="/account/: id?" element={ <UserRequireAuth> <Account />  </UserRequireAuth>} />
          <Route path="/checkout" element={ <UserRequireAuth> <CheckOut /> </UserRequireAuth> } /> 
          <Route path="/order-confirmation/:id" element={ <UserRequireAuth> <OrderConfirmation /> </UserRequireAuth> } /> 
          <Route path="/account/order-list" element={ <UserRequireAuth> <Show/>  </UserRequireAuth> } /> 
          <Route path="/account/order/details/:id" element={ <UserRequireAuth> <FrontOrderDetail/>  </UserRequireAuth> } /> 


          <Route path="/admin/dashboard" element={
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>

          } />

          <Route path="/admin/category" element={
            <AdminRequireAuth>
              <ShowCategories />
            </AdminRequireAuth>

          } />
          <Route path="/admin/category/create" element={
            <AdminRequireAuth>
              <CreateCategories />
            </AdminRequireAuth>
          } />

          <Route path="/admin/category/:id" element={
            <AdminRequireAuth>
              <EditCategories />
            </AdminRequireAuth>
          } />



          {/* brand */}

          <Route path="/admin/brand" element={
            <AdminRequireAuth>
              <ShowBrand />
            </AdminRequireAuth>

          } />
          <Route path="/admin/brand/create" element={
            <AdminRequireAuth>
              <CreateBrand />
            </AdminRequireAuth>
          } />

          <Route path="/admin/brand/:id" element={
            <AdminRequireAuth>
              <EditBrand />
            </AdminRequireAuth>
          } />

          {/* brand */}



           {/* product */}

          <Route path="/admin/product" element={
            <AdminRequireAuth>
              <ShowProduct />
            </AdminRequireAuth>

          } />
          <Route path="/admin/product/create" element={
            <AdminRequireAuth>
              <CreateProduct />
            </AdminRequireAuth>
          } />

          <Route path="/admin/product/:id" element={
            <AdminRequireAuth>
              <EditProduct />
            </AdminRequireAuth>
          } />

          {/* product */}

          {/* Order */}
          <Route path="/admin/orders" element={
            <AdminRequireAuth>
              <ShowOrder />
            </AdminRequireAuth>

          } />
          <Route path="/admin/order-details/:id" element={
            <AdminRequireAuth>
              <OrderDetail />
            </AdminRequireAuth>

          } />
          {/* End Orders */}








        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
