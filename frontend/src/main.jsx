import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.scss';  
import { AdminAuthProvider } from './components/Context/AdminAuth.jsx';
import { UserAuthProvider } from './components/Context/UserAuth.jsx';
import CartProvider from './components/Context/AddToCart.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminAuthProvider>
      <UserAuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </UserAuthProvider>
    </AdminAuthProvider>    
  </StrictMode>
)
