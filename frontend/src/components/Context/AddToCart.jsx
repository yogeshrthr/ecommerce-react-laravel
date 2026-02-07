import { createContext, useEffect, useState } from "react";
export const CartContext =createContext();

// export const CartProvider=({children})=>{
//     const [cartData,setCartData]=useState(()=>{
//         const cart=localStorage.getItem('cart');        
//         return cart? JSON.parse(cart):[];        
//     })
//     console.log(cartData)
    
//     // const AddToCart=(data,size=null)=>{
//         // let udpateCart=[...cartData];
//         // const sizeName = data.product_size.find(
//         //     (item) => item.size_id === size
//         //     )?.size?.[0]?.name;

//         // if(cartData.length===0){
//         //     udpateCart.push({
//         //         id:`${data.id}-${Math.floor(Math.random()*10000)}`,
//         //         product_id:data.id,
//         //         product_name:data.title,
//         //         size:size,
//         //         sizeName:sizeName,
//         //         title:data.title,
//         //         qty:1,
//         //         image_url:data.image_url,
//         //         price:data.price
//         //     })
//         //     console.log("first item added")
//         // }else{
          
//         //     let index='';
//         //     if(size!=null){
//         //          index=udpateCart.findIndex((item)=>{
//         //             return  item.product_id==data.id && item.size==size;
                    
//         //         })
//         //         if(index!==-1){
//         //                 udpateCart[index]={
//         //                 ...udpateCart[index], 
//         //                 qty: udpateCart[index].qty + 1
//         //             };
//         //              console.log("item size both match qty updated",data.id, size,index,udpateCart)
//         //         }else{
//         //             udpateCart.push({
//         //                 id:`${data.id}-${Math.floor(Math.random()*10000)}`,
//         //                 product_id:data.id,
//         //                 product_name:data.title,
//         //                 size:size,
//         //                 sizeName:sizeName,
//         //                 title:data.title,
//         //                 qty:1,
//         //                 image_url:data.image_url,
//         //                  price:data.price

//         //             })
//         //             console.log("item size both not match update as new reson but same product")
//         //         }

//         //     }else{
//         //          index=udpateCart.findIndex((item)=>{
//         //             return  item.product_id==data.id;
                    
//         //         })
//         //         if(index!==-1){
//         //                 udpateCart[index]={
//         //                 ...udpateCart[index], 
//         //                 qty: udpateCart[index].qty + 1
//         //             };
//         //             console.log("item id matchd qty updated")
//         //         }else{
//         //             udpateCart.push({
//         //                 id:`${data.id}-${Math.floor(Math.random()*10000)}`,
//         //                 product_id:data.id,
//         //                 product_name:data.title,
//         //                 size:size,
//         //                 sizeName:sizeName,
//         //                 title:data.title,
//         //                 qty:1,
//         //                 price:data.price,
//         //                 image_url:data.image_url
//         //             })
//         //              console.log("item id not match add as fresh")
//         //         }

//         //     }
            
//         //     // console.log(index)
            
//         //     // console.log('udpated')
//         //     // if(cartData.find((item)=>item.id==data.id && item.size==size)){
//         //     //     udpateCart
//         //     // }
//         //     console.log(udpateCart,data)
//         // }        
//         // localStorage.setItem('cart',JSON.stringify(udpateCart));
//         // setCartData(udpateCart);       

//         // Use functional update to avoid "Ghost Items"
//             // setCartData((prevCart) => {
//             //     let updatedCart = [...prevCart];
                
//             //     const sizeName = data.product_size?.find(
//             //         (item) => item.size_id === size
//             //     )?.size?.[0]?.name;

//             //     // Find if item exists (Check for both product_id and size)
//             //     const index = updatedCart.findIndex((item) => 
//             //         item.product_id === data.id && item.size === size
//             //     );

//             //     if (index !== -1) {
//             //         // Update Quantity
//             //         updatedCart[index] = {
//             //             ...updatedCart[index],
//             //             qty: Number(updatedCart[index].qty) + 1
//             //         };
//             //     } else {
//             //         // Add New Item
//             //         updatedCart.push({
//             //             id: `${data.id}-${Math.floor(Math.random() * 10000)}`,
//             //             product_id: data.id,
//             //             product_name: data.title,
//             //             size: size,
//             //             sizeName: sizeName || 'Standard',
//             //             title: data.title,
//             //             qty: 1,
//             //             image_url: data.image_url,
//             //             price: data.price
//             //         });
//             //     }

//             //     localStorage.setItem('cart', JSON.stringify(updatedCart));
//             //     return updatedCart;
//             // });
//         // };


        
//     // }
//     const AddToCart = (data, size = null) => {
//             setCartData((prevCart) => {
//                 // 1. Always work with the most recent state (prevCart)
//                 const updatedCart = [...prevCart];

//                 const sizeName = data.product_size?.find(
//                     (item) => item.size_id === size
//                 )?.size?.[0]?.name;

//                 const index = updatedCart.findIndex((item) => 
//                     item.product_id === data.id && item.size === size
//                 );

//                 if (index !== -1) {
//                     updatedCart[index] = {
//                         ...updatedCart[index],
//                         qty: Number(updatedCart[index].qty) + 1
//                     };
//                 } else {
//                     updatedCart.push({
//                         id: `${data.id}-${Date.now()}`, // Using Date.now() is safer than random
//                         product_id: data.id,
//                         product_name: data.title,
//                         size: size,
//                         sizeName: sizeName || 'Standard',
//                         title: data.title,
//                         qty: 1,
//                         image_url: data.image_url,
//                         price: data.price
//                     });
//                 }

//                 // 2. Update LocalStorage IMMEDIATELY with the new calculation
//                 localStorage.setItem('cart', JSON.stringify(updatedCart));
//                 return updatedCart;
//             });
//         };
//     const shippingCharge=()=>{
//         return 0;
//     }
//     const subTotal=()=>{
//         let total = 0;            
//         cartData.map((item) => {
//             total += item.price * item.qty;
//             return item; // map always needs to return something
//         });            
//         return total;
//     }
//     const grandTotal=()=>{
//        return  subTotal() + shippingCharge();        
//     }
//     // const updateCartQuantity=(itemId,qty)=>{
       
//     //     const updatedCart = cartData.map((item) => {
//     //         if (item.id === itemId) {
//     //             return { ...item, qty: item.qty =qty};
//     //         }
//     //         return item;
//     //     });
//     //     localStorage.setItem('cart',JSON.stringify(updatedCart));
//     //         setCartData(updatedCart)

//     // }
//     // const deleteCartItem=(id)=>{
//     //     // console.log(id)
//     //     const cartItem=localStorage.getItem('cart')|| [];
//     //     if(cartItem){
//     //         let udpatedCart= JSON.parse(cartItem)            
//     //         const temp=udpatedCart.filter((it)=>{
//     //             return it.id!=id
//     //         }) 

//     //         localStorage.setItem('cart',JSON.stringify(temp))
//     //         setCartData(temp)
//     //         return true;           
//     //     }else{
//     //         return false;    
//     //     }
        
//     // }
//     const deleteCartItem = (id) => {
//         setCartData((prevCart) => {
//             const filtered = prevCart.filter(item => item.id !== id);
//             localStorage.setItem('cart', JSON.stringify(filtered));
//             return filtered;
//         });
//         return true;
//     };

//     const updateCartQuantity = (itemId, qty) => {
//         setCartData((prevCart) => {
//             const updated = prevCart.map((item) => 
//                 item.id === itemId ? { ...item, qty: Number(qty) } : item
//             );
//             localStorage.setItem('cart', JSON.stringify(updated));
//             return updated;
//         });
//     };

//     // const subTotal = () => {
//     //     return cartData.reduce((acc, item) => acc + (item.price * item.qty), 0);
//     // };
   
//     return (
//         <CartContext.Provider value={{AddToCart,cartData,shippingCharge, subTotal,grandTotal,updateCartQuantity,deleteCartItem}}  >
//             {children}        
//         </CartContext.Provider>
//     )

// }
// Inside CartProvider.jsx

export const CartProvider = ({ children }) => {
    const [cartData, setCartData] = useState(() => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    });

    // Sync LocalStorage whenever cartData changes
    // This ensures that Add, Delete, and Update all save correctly
   useEffect(() => {
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

    const shippingCharge = () => 0;
    const grandTotal = () => subTotal() + shippingCharge();

    const getQty=()=>{
        let qty=0;
         cartData.map((item) =>{
            qty+=item.qty;
         });
         return qty;
    }

    return (
        <CartContext.Provider value={{getQty, AddToCart, cartData, shippingCharge, subTotal, grandTotal, updateCartQuantity, deleteCartItem }}>
            {children}
        </CartContext.Provider>
    );
};
    
export default CartProvider;