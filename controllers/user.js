class userController {

    async register(req, res) {
        try {
            const cryptPassword = await bcrypt.hash(req.body.password, 10);
            const registeredId = await userModel.create({
                username: req.body.username,
                email: req.body.email,
                password: cryptPassword
            });

            if (registeredId) {
                const userData = await userModel.findById(registeredId);
                req.session.user = {
                    username: userData.username,
                    user_id: userData.id
                };

                res.json({
                    message: "New user is registered",
                    user_session: req.session.user
                });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error registering user" });
        }
    }
}

module.exports = new userController(); 
