const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
    })

    const result = await user.save()

    const data = await result.toJSON()

    res.send(data)
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if (!user) {
        return res.status(404).send({
            message: 'utilisateur non reconnu'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({
            message: 'Mot de passe invalide'
        })
    }

    const token = jwt.sign({_id: user._id}, "quasartest")

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 journée
    })

    res.send({
        message: 'connexion reussite'
    })
})

router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt']

        const recupere = jwt.verify(cookie, 'quasartest')

        if (!recupere) {
            return res.status(401).send({
                message: 'non authentifie'
            })
        }

        const user = await User.findOne({_id: recupere._id})

        const {password, ...data} = await user.toJSON()

        res.send(data)
    } catch (e) {
        return res.status(401).send({
            message: 'non authentifie'
        })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: 'deconnexion reussite'
    })
})

module.exports = router;
