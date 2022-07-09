import { db } from "../db.js";
import { ObjectId } from "mongodb";

export async function validateObjectId(req,res,next){
    const _id=req.params.id;

    if(ObjectId.isValid(_id)){
        if((String)(new ObjectId(_id)) === _id){
            const product = await db.products.findOne({_id: ObjectId(_id) });
            if(!product){
                return res.status(400).send('There is no product with this id!');
            }
            res.locals.product=product;
            return next();          
        }
        return res.status(422).send('The parameter must be a valid _id/ObjectId!');
    }
    return res.status(422).send('The parameter must be a valid _id/ObjectId!');
}

export async function validateCategory(req,res,next){
    const category=req.params.category;

    if(category!== 'Movie' && category!=='Video Game'){
        return res.status(404).send(`${category} category doens't exists! Try 'Movie' or 'Video Game'`);
    }

    const categoryExist=await db.categories.findOne({category});
    
    if(!categoryExist){
        return res.status(204).send(`${category} category is empty!`);
    }
    
    res.locals._idCategory=categoryExist._id;
    return next();
}