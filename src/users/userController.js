const { userModel } = require("../../model/users")
var passport = require("passport")
const { hashPassword, validateUser } = require("../../config/helper")

const authenticate = require('../../middleware/authenticate')

async function createUser(req, res) {
    const { firstname, lastname, username, email, password, phonenumber } = req.body;
    let userExist = await userModel.findOne({ username: username }) 
                    || await userModel.findOne({ email: email })
    if (userExist) {
        return res.status(409).json({status: false, msg: "This user already exist!"})
    }
    
    const user = await userModel.create({
        firstname, lastname, username, email, password, phonenumber
    })

   user.password = undefined
    res.json({
        msg: "Registration successful!",
        user
    })
};

const loginUser = async (req, res) => {
    const { identity, password } = req.body
    const user = await validateUser(identity, password)
    if (!user) {
        return res.status(401).send("Invalid crendentials!")
    }
    var token = authenticate.getToken({ _id: user._id })
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ success: true, token, status: 'You are successfully logged in' })
}

const logoutUser = async (req, res) => {
    try {
        console.log(req.user)
        res.clearCookie('jwt')
        console.log('logout successful')

        await req.user.save()
        res.json({ status: true, message: 'logout successful' })
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getAllUser(req, res) {
    const user = await userModel.find({});
    res.status(200).json({
        msg: "all users",
        data: user
    })
}

async function getOneUser(req, res) {
    const userId = req.params.id
    const user = await userModel.findById(userId)
    if (!user) {
        return res.status(404).send("User with this id does not exist!")
    }
    res.status(200).send(user)
}

async function updateUserById(req, res) {
    const id = req.params.id;
    const { firstname, lastname, email, username } = req.body;

    let user = await userModel.findByIdAndUpdate(id, { firstname, lastname, email, username }, { new: true });

    if (!user) {
        return res.status(404).send("User does not exit")
    }
    res.status(201).json({
        msg: "User updated Successfully",
        data: user
    })
};

async function updateUserPassword(req, res) {
    let { password } = req.body;
    const userId = req.user.id

    const hashedPassword = await hashPassword(password)

    let user = await userModel.findByIdAndUpdate(userId, { hashedPassword }, { new: true });

    if (!user) {
        return res.status(404).send("User does not exit")
    }
    res.status(201).json({
        msg: "User updated Successfully",
        data: user
    })
}

async function deleteUserById(req, res) {
    const id = req.params.id;

    const user = await userModel.findByIdAndDelete(id)
    if (!user) {
        return res.status(404).send("Can't delete! user does not exist!")
    }
    user.delete()
    res.json({
        status: 200,
        msg: "User deleted successfully!"
    })
}


async function getSellers(req, res, next) {
    const sellers = await userModel.aggregate([
        {
            $match: {
                usertype: "business"
            }
        }
    ])
    res.status(200).json({ status: true, sellers: sellers })
}

async function getSellerById(req, res) {
    const sellerId = req.params.id
    const seller = await userModel.findOne({ _id: sellerId, usertype: "business" })

    res.status(200).json({
        status: true,
        seller: seller
    })
}


module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUserById,
    deleteUserById,
    getAllUser,
    getOneUser,
    getSellers,
    getSellerById,
    updateUserPassword
}