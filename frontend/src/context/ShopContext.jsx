import { createContext, useEffect, useState } from "react"; 
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



export const ShopContext = createContext(); 

const ShopContextProvider = (props) => { 
    const currency = '₹'; 
    const delivery_fee = 10; 
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    console.log(backendUrl)
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if(!size){
            toast.error('Select Product Size');
            return;
        }
        // Ensure cartItems is always an object before cloning
        const currentCart = cartItems && typeof cartItems === 'object' && !Array.isArray(cartItems) ? cartItems : {};
        let cartData = structuredClone(currentCart);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
        if(token){
            try{
                const response = await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers:{token}})
                if(response.data.success){
                    toast.success(response.data.message || 'Product added to cart');
                }
                else{
                    toast.error(response.data.message || 'Failed to add to cart');
                }
            }
            catch(error){
                console.log(error);
                toast.error(error.response?.data?.message || error.message || 'Failed to add to cart')
            }
        }
        else{
            // Cart works locally even without token
            toast.success('Product added to cart');
        }
    }
       
    const getCartCount = () => {
        let totalCount = 0;
        if(!cartItems || typeof cartItems !== 'object' || Array.isArray(cartItems)){
            return 0;
        }
        for(const items in cartItems){
            if(cartItems[items] && typeof cartItems[items] === 'object'){
                for(const item in cartItems[items]){
                    try{
                        if(cartItems[items][item] > 0){
                            totalCount += cartItems[items][item]
                        }
                    }
                    catch(error){
                    
                    }
                }
            }   
        }
        return totalCount;
    }
    const updateQuantity = async (itemId, size, quantity) => {
        // Ensure cartItems is always an object before cloning
        const currentCart = cartItems && typeof cartItems === 'object' && !Array.isArray(cartItems) ? cartItems : {};
        let cartData = structuredClone(currentCart);
        if(quantity === 0){
            // Remove item if quantity is 0
            if(cartData[itemId] && cartData[itemId][size]){
                delete cartData[itemId][size];
                // Remove itemId if no sizes left
                if(Object.keys(cartData[itemId]).length === 0){
                    delete cartData[itemId];
                }
            }
        } else {
            if(!cartData[itemId]){
                cartData[itemId] = {};
            }
            cartData[itemId][size] = quantity;
        }
        setCartItems(cartData);
        if(token){
            try{
                const response = await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers: {token}})
                if(!response.data.success){
                    toast.error(response.data.message || 'Failed to update cart');
                }
            }
            catch(error){
                console.log(error);
                toast.error(error.response?.data?.message || error.message || 'Failed to update cart')
            }
        }
    }
    const getCartAmount = () => {
        let totalAmount = 0;
        if(!cartItems || typeof cartItems !== 'object' || Array.isArray(cartItems)){
            return 0;
        }
        for(const items in cartItems){
            if(cartItems[items] && typeof cartItems[items] === 'object'){
                let itemInfo = products.find((product)=> product._id === items);
                if(itemInfo){
                    for(const item in cartItems[items]){
                        try{
                            if(cartItems[items][item] > 0){
                                totalAmount += itemInfo.price * cartItems[items][item];
                            }
                        }
                        catch (error){

                        }
                    }
                }
            }
        }
        return totalAmount;
    }

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products);
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch (error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try{
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
            if(response.data.success){
                const cartData = response.data.message;
                // Ensure cartData is always an object
                if(cartData && typeof cartData === 'object' && !Array.isArray(cartData)){
                    setCartItems(cartData);
                } else {
                    setCartItems({});
                }
            }
        }
        catch (error){
            console.log(error)
            // Don't show error if it's just a network issue, cart can work locally
            if(error.response && error.response.status !== 401){
                toast.error(error.message)
            }
            setCartItems({});
        }
    }
    useEffect(()=>{
        getProductsData()
    }, [])

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        if(storedToken && !token){
            setToken(storedToken);
            getUserCart(storedToken);
        }
    }, [])

    useEffect(()=>{
        if(token){
            getUserCart(token);
        }
    }, [token])

    const value = { 
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, setCartItems, addToCart, 
        getCartCount, updateQuantity, getCartAmount,
        navigate, backendUrl, token, setToken,
        setProducts
    } 
    return ( 
        <ShopContext.Provider value={value}> 
            {props.children}
        </ShopContext.Provider> 
    ) 
} 
export default ShopContextProvider;