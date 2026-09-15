import express from 'express';
import cors from 'cors';
import fs from 'fs';
import products from products;

const app=express();
app.use(cors());
app.use(express.json());
//GET
app.get('/products',(req,res)=>{
    const data=fs.readFile("products.json","gtf-8");
    const products=JSON.parse(data);
    res.json(products);

});
app.post('/products',)

app.listen(4000,()=>{


});