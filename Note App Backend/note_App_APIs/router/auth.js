const router = require("express").Router();
const User = require("../models/User");

router.get("/login", (req, res) => {
    res.send("User logged in");
})

router.post("/register", async (req, res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        const data = await user.save();
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json(e);
    }

})

module.exports = router;