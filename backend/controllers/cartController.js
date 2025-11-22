import userModel from "../models/userModel.js";


// add products to user cart
const addToCart = async (req, res) => {
    try{
        const { userId, itemId, size } = req.body;
        if(!userId || !itemId || !size){
            return res.json({success: false, message: "Missing required fields"});
        }
        const userData = await userModel.findById(userId);
        if(!userData){
            return res.json({success: false, message: "User not found"});
        }
        let cartData = userData.cartData || {};
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
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Product added to cart successfully"});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message});
    }
}


// update user cart
const updateCart = async (req, res) => {
    try{
        const { userId, itemId, size, quantity } = req.body
        if(!userId || !itemId || !size || quantity === undefined){
            return res.json({success: false, message: "Missing required fields"});
        }
        const userData = await userModel.findById(userId);
        if(!userData){
            return res.json({success: false, message: "User not found"});
        }
        let cartData = userData.cartData || {};
        
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
        
        await userModel.findByIdAndUpdate(userId, {cartData})
        res.json({success: true, message: "Cart updated successfully"});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

// get user cart
const getUserCart = async (req, res) => {
    try{
        const { userId } = req.body;
        if(!userId){
            return res.json({success: false, message: "User ID is required"});
        }
        const userData = await userModel.findById(userId);
        if(!userData){
            return res.json({success: true, message: {}});
        }
        let cartData = userData.cartData || {};
        res.json({success: true, message: cartData});
    }
    catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export { addToCart, updateCart, getUserCart }