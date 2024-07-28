import mongoose from "mongoose";

const companySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        
    },
    website:{
        type:String,
       
    },
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    logo:{
        type:String,
      
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    }
},{timestamps:true})

export const Company=mongoose.model('Company',companySchema);