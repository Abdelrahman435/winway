const util = require("util");
const fs = require("fs");
const {createCart , removeCart} = require('../services/cartService')

async function addToCart(req,res){
    try {
        
    const x= await createCart(req.params.courseId , req.params.studentId)  
    res.send(x)
    } catch (err) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
    }
} 
async function removeFromCart (req,res){
    try {
        const removedCourse = await removeCart(req.params.courseId , req.params.studentId)
        res.status(200).json({msg:"course has been removed from the cart"})
    } catch (error) {
        console.error(err);
        res.status(500).json({ errors: ["Internal server error"] });
    }
}

module.exports={addToCart , removeFromCart}