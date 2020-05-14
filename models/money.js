const mongoose=require('mongoose')
const moneySchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    totalMoney:{
        type:Number,
        required:true,
        default:0
    },
    borrowedMoney:{
        type:Number,
        required:true,
        default:0
    },
    lentMoney:{
        type:Number,
        required:true,
        default:0
    },
    borrowHistory:[{
        from:{
            type:String,
            required:true,
            default:'x'
        },
        description:{
            type:String,
            required:true,
            default:'personal'
        },
        amount:{
            type:Number,
            require:true,
            default:0
        }
    }],
    lendHistory:[{
        to:{
            type:String,
            required:true,
            default:'x'
        },
        description:{
            type:String,
            required:true,
            default:'personal'
        },
        amount:{
            type:Number,
            require:true,
            default:0
        }
    }]

})
module.exports=mongoose.model('Money',moneySchema)