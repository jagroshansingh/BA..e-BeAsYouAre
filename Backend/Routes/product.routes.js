const express=require('express')
const { productModel } = require('../model/productModel')
const productrouter=express.Router()

productrouter.get('/',async(req,res)=>{
    try {
        let see=await productModel.find({'location':req.query.location})
        res.send(see)
    } catch (error) {
        console.log(error)
    }
})

module.exports={productrouter}