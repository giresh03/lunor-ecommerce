import { createContext, useEffect, useState } from "react"; 
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



export const ShopContext = createContext(); 

const ShopContextProvider = (props) => { 
    const currency = '₹'; 
    const delivery_fee = 10; 
    // Get backend URL from environment, with smart fallback
    const getBackendUrl = () => {
        // First check environment variable
        if (import.meta.env.VITE_BACKEND_URL) {
            return import.meta.env.VITE_BACKEND_URL;
        }
        // If localhost, use local backend
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            return 'http://localhost:8000';
        }
        // Production fallback - use Render backend URL
        return 'https://lunor-ko-backend.onrender.com';
    }
    const backendUrl = getBackendUrl();
    console.log('Backend URL:', backendUrl || 'Not configured - backend features will be disabled')
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
        if (!backendUrl) {
            console.warn('Backend URL not configured. Some features may not work.');
            return;
        }
        try {
            console.log('Fetching products from:', backendUrl + '/api/product/list');
            const response = await axios.get(backendUrl + '/api/product/list', {
                timeout: 10000 // 10 second timeout (longer for Render cold starts)
            })
            if(response.data.success){
                console.log('Products loaded:', response.data.products?.length || 0);
                setProducts(response.data.products || []);
            }
            else{
                console.error('Failed to load products:', response.data.message);
                toast.error(response.data.message || 'Failed to load products')
            }
        }
        catch (error){
            console.error('Failed to fetch products:', error.message);
            console.error('Backend URL:', backendUrl);
            // Show error toast for debugging
            if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
                toast.error('Cannot connect to backend. Please check if backend is deployed.');
            } else {
                toast.error('Failed to load products: ' + (error.response?.data?.message || error.message))
            }
            // Set empty products array on error
            setProducts([]);
        }
    }

    const getUserCart = async (token) => {
        if (!backendUrl || !token) {
            return;
        }
        try{
            const response = await axios.post(backendUrl + '/api/cart/get', {}, {
                headers: {token},
                timeout: 5000
            })
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
            console.log('Failed to fetch cart:', error.message)
            // Don't show error if it's just a network issue, cart can work locally
            if(error.response && error.response.status !== 401 && error.code !== 'ERR_NETWORK'){
                toast.error(error.message)
            }
            // Keep local cart items if backend fails
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