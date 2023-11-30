const router = require('express').Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = db;

router.post('/', async (req, res) => {
    try {
        let user = await User.findOne({
            where: { email: req.body.email },
        });

        if (!user || !(await bcrypt.compare(req.body.password, user.passwordDigest))) {
            res.status(404).json({
                message: `Could not find a user with the provided username and password`,
            });
        } else {
            const token = jwt.sign({ id: user.userId }, process.env.JWT_SECRET);
            res.json({ user: user, token: token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/profile', async (req, res) => {
    try {
        // Split the authorization header into [ "Bearer", "TOKEN" ]:
        const [authenticationMethod, token] = req.headers.authorization.split(' ');

        // Only handle "Bearer" authorization for now
        //  (we could add other authorization strategies later):
        if (authenticationMethod === 'Bearer') {
            // Decode the JWT
            const decodedToken = jwt.decode(token);

            if (!decodedToken) {
                return res.status(401).json({ message: 'Invalid or missing token' });
            }
            // Get the logged in user's id from the payload
            const { id } = decodedToken;

            if (!id) {
                return res.status(401).json({ message: 'Invalid token payload' });
            }
            // Find the user object using their id:
            let user = await User.findOne({
                where: {
                    userId: id,
                },
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
