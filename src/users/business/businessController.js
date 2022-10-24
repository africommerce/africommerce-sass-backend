const { userModel, businessModel } = require('../../../model/users')


async function registerBusinessUser(req, res) {
    const { business_name, address, logo } = req.body
    const userId = req.user.id
    const userIsBusiness = await userModel.findById(userId).usertype === "business"
    if (userIsBusiness) {
        return res.status(400).send("You are a business user already!")
    }
    const businessUser = await businessModel.create({ business_name, address, logo, owner: userId })
    const updateUser = await userModel.findByIdAndUpdate(userId, { usertype: "business" }, { new: true })
    console.log(updateUser)
    res.send(businessUser)

}

async function getBusinessUserInfo(req, res) {
    const user = await businessModel.findOne({ _id: req.params.id }).populate("owner")
    if (!user) {
        return res.status(404).send("User not found!")
    }
    res.status(200).json({
        msg: "successful!",
        data: user
    })
}

async function getAllBusinessUser(req, res) {
    const user = await businessModel.find({})
    res.json({
        status: 200,
        data: user
    })
}

async function updateBusinessInfo(req, res) {
    const user = await businessModel.findByIdAndUpdate(req.params.id, { extra: "i'm just adding an extra write up and nothing more!" })
    if (!user) {
        return res.status(404).send("This user does not exist!")
    }
    res.status(200).json({
        msg: "successful!",
        data: user
    })
}

module.exports = {
    registerBusinessUser,
    getBusinessUserInfo,
    updateBusinessInfo,
    getAllBusinessUser
}