import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../common/http";
export const CartContext =createContext();

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(() => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    });
    const [shipping, setShipping]=useState(0);
    const [shippingLoader, setShippingLoading]=useState(true);

    // Sync LocalStorage whenever cartData changes
    // This ensures that Add, Delete, and Update all save correctly
   useEffect( () => {
        setShippingLoading(true)
        fetch(apiUrl+`/get-shipp-charge`,{
            method:'GET',
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
            }
        }).then(res=>{
            return res.json().then(errData=>{
                if(!res.ok){
                    const error=Error(errData.message|| 'Unexcepted Errror')
                    error.status=errData.status
                    error.error=errData.errors
                    throw error;
                }
                return errData;
            }).then(result=>{
                setShipping(result.data);
            }).catch(error=>{

            })
        }).finally(()=>{
            setShippingLoading(false)
        })
        // 1. Save to localStorage when state changes
        localStorage.setItem('cart', JSON.stringify(cartData));
    }, [cartData]);

    useEffect(() => {
        // 2. Listen for changes in OTHER tabs/windows
        const handleStorageChange = (e) => {
            if (e.key === 'cart') {
                const updatedCart = e.newValue ? JSON.parse(e.newValue) : [];
                setCartData(updatedCart);
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const AddToCart = (product, size = null) => {
        setCartData((prevCart) => {
            // Check if item already exists in the LATEST state (prevCart)
            const existingItemIndex = prevCart.findIndex(
                (item) => item.product_id === product.id && item.size === size
            );

            if (existingItemIndex !== -1) {
                // If it exists, increase quantity
                return prevCart.map((item, index) =>
                    index === existingItemIndex
                        ? { ...item, qty: Number(item.qty) + 1 }
                        : item
                );
            } else {
                // If new, add it
                const sizeName = product.product_size?.find(
                    (s) => s.size_id === size
                )?.size?.[0]?.name || 'Standard';

                const newItem = {
                    id: `${product.id}-${Date.now()}`,
                    product_id: product.id,
                    product_name: product.title,
                    size: size,
                    sizeName: sizeName,
                    title: product.title,
                    qty: 1,
                    image_url: product.image_url,
                    price: product.price
                };
                return [...prevCart, newItem];
            }
        });
    };

    const deleteCartItem = (id) => {
        setCartData((prevCart) => prevCart.filter(item => item.id !== id));
        return true;
    };

    const updateCartQuantity = (itemId, qty) => {
        setCartData((prevCart) =>
            prevCart.map((item) =>
                item.id === itemId ? { ...item, qty: Number(qty) } : item
            )
        );
    };

    // Use reduce for better calculation performance
    const subTotal = () => {
        return cartData.reduce((acc, item) => acc + (item.price * item.qty), 0);
    };

    const shippingCharge = () =>{
        let chrg=0;
        cartData.map((item) =>{
            chrg+=item.qty*shipping?.shipping_charge||0;
        });
        console.log(chrg,shipping)
        return chrg;
    };
    const grandTotal = () => subTotal() + shippingCharge();

    const getQty=()=>{
        let qty=0;
         cartData.map((item) =>{
            qty+=item.qty;
         });
         return qty;
    }

    return (
        <CartContext.Provider value={{getQty, AddToCart, cartData, shippingCharge, subTotal, grandTotal, updateCartQuantity, deleteCartItem,shippingLoader }}>
            {children}
        </CartContext.Provider>
    );
};
    
export default CartProvider;