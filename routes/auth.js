let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/auth/register', async function (req, res, next) {
    // res.render("/login.html");

    const {username, password, password_confirm} = req.body

    db.query('SELECT username FROM users WHERE username = ?', [username], async (error, res) => {
        // remaining code goes here
        if (error) {
            console.log(error)
        }
    })

    if (result.length > 0) {
        return res.render('register', {
            message: 'This email is already in use'
        })
    } else if (password !== password_confirm) {
        return res.render('register', {
            message: 'Passwords do not match!'
        })
    }

    let hashedPassword = await bcrypt.hash(password, 8)

    db.query('INSERT INTO users SET?', {username: username, password: hashedPassword}, (err, res) => {
        if (error) {
            console.log(error)
        } else {
            return res.render('register', {
                message: 'User registered!'
            })
        }
    })

});

module.exports = router;