import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import CheckOut from './components/CheckOut'
import AdminLogin from './components/Admin/Login'
import Dashboard from './components/Admin/Dashboard'
import { ToastContainer, toast } from 'react-toastify';
import { AdminRequireAuth } from './components/Admin/AdminRequireAuth'
import { default as CreateCategories } from './components/Admin/category/Create';
import { default as ShowCategories } from './components/Admin/category/Show';
import { default as EditCategories } from './components/Admin/category/Edit';

import { default as CreateBrand } from './components/Admin/brand/create';
import { default as ShowBrand } from './components/Admin/brand/Show';
import { default as EditBrand } from './components/Admin/brand/Edit';



import { default as CreateProduct } from './components/Admin/product/create';
import { default as ShowProduct } from './components/Admin/product/Show';
import { default as EditProduct } from './components/Admin/product/Edit';



import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/admin/login" element={<AdminLogin />} />

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








        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
