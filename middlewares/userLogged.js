const User = require('../models/Users')
const db = require('../database/models')
//MIGRAR DEL JSON A DB

function userLogged(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail
    db.Users.findAll()
        .then(users => {
            let userFromCookie = users.find(i => i.email == emailInCookie)

            if (userFromCookie) {
                req.session.userLogged = userFromCookie
            }

            if (req.session.userLogged) {
                res.locals.isLogged = true;
                res.locals.userLogged = req.session.userLogged
            }

            next();
        }
    )
}

module.exports = userLogged