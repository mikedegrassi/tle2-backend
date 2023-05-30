let express = require('express');
const User = require("../models/userModel");
const Stats = require("../models/statsModel");
const sequelize = require("../config/db");
const bcrypt = require("bcrypt");
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {

    if (req.header('Accept') !== "application/json") {
        res.status(415).send();
    }

    const users = await User.findAll();

    try {

        let userCollection = {
            users: users
        };

        res.status(200).json(userCollection);
    } catch (err) {
        res.status(400).json({message: err.message});
    }

});

router.get("/:id", async (req, res) => {


    const user = await User.findOne({
        where: {
            id: (req.params.id)
        }
    });

    const stats = await Stats.findAll({
        where: {
            user_id: (req.params.id)
        }
    });

    try {

        let userCollection =
            {
                user,
                stats
            };


        res.status(200).json(userCollection);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

router.post('/register', async(req, res)=>{

    const salt = await bcrypt.genSalt(10);
    let usr = {
        username : req.body.username,
        age : req.body.age,
        length : req.body.length,
        password : await bcrypt.hash(req.body.password, salt)
    };
    let created_user = await User.create(usr);

    let stats = {
        user_id: created_user.id,
        pass: 33,
        shot: 33,
        dribble: 33,
        physical: 33,
        defense: 33,
        pace: 33,
    }

    let created_user_stats = await Stats.create(stats);

    res.status(201).json(created_user_stats);

});

module.exports = router;
