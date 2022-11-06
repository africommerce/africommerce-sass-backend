//importing the mongoose database ORM
const mongoose = require("mongoose")
const Schema = mongoose.Schema

//modelling the User schema
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        default: '',
        required: true,
        select: false
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phonenumber: {
        type: String,
        default: '',
        required: true
    },
    address: {
        type: String,
        default: ''
    },
    usertype: {
        type: String,
        enum: ['business', 'user'],
        default: 'user'
    },
    admin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


const businessUser = new mongoose.Schema({
    business_name: {
        type: String,
        required: [true, "You must provide a buisness name"],
        // unique: [true, "This name already exist!"],
    },
    address: [
        {
            country: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            street_address: {
                type: String,
                required: true
            }
        },
    ],
    logo: {
        type: String,
        required: [true, "You must provide a logo for your brand!"]
    },
    owner: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]

},
    { timestamps: true }
)




const businessModel = mongoose.model("Business", businessUser)
const userModel = mongoose.model("User", UserSchema)

module.exports = { userModel, businessModel }