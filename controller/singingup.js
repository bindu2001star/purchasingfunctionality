const User = require('../model/user');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('email', email)

        if (name == undefined || name.length === 0 ||
            password == null || password.length === 0 ||
            email == null || email.length === 0) {
            return res.status(400).json({ err: "parameters are missing" })
        }
        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            console.log(err)
            await User.create({ name, email, password: hash })
            res.status(201).json({ message: 'successfully created new user' })


        })

    } catch (err) {
        res.status(500).json(err)
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("recevied login data:", email);
        console.log("bin", password);
        const user = await User.findAll({ where: { email } })
        if (user.length > 0) {
            console.log(user[0].password);
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    throw new ERROR("something went wrong");
                }
                if (result === true) {
                    return res.status(200).json({ success: true, message: "user logged in succesfully" })
                } else {
                    return res.status(400).json({ success: false, message: "password doesntttt match" })

                }
            })

        } else {
            return res.status(404).json({ success: false, message: "user doesnot exist" })
        }

    }
    catch (err) {
        return res.status(500).json(err)
    }

}
module.exports = {
    signup: signup,
    login: login
}