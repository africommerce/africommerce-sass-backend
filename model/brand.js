const mongoose = require("mongoose")
const Schema = mongoose.Schema

const brandSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    product: [
        {
            type: mongoose.Types.ObjectId,
            required: true
        }
    ]
},
    { timestamps: true }

)

const brandModel = mongoose.model("Brand", brandSchema)
module.exports = brandModel