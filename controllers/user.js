const bcrypt = require("bcrypt");
const userDbModel = require('../models/user');
const userModel = new userDbModel();

class userController {
    async register(req, res) {
        const { name, email, password, password_confirm } = req.body;
        
        try {
            // Check if the email already exists
            console.log('Checking email:', email); // Debugging line
            const emailCheck = await userModel.findOne({ email: email });

            console.log('Email check result:', emailCheck); // Debugging line
            // If emailCheck is not null, it means the email already exists
            if (emailCheck) {
                return res.render('register', { message: 'This email is already in use' });
            }
            
            // Check if passwords match
            if (password !== password_confirm) {
                return res.render('register', { message: 'Passwords do not match!' });
            }

            // Hash the password
            const cryptPassword = await bcrypt.hash(password, 10);

            // Create a new user
            const registeredId = await userModel.create({
                username: name,
                email: email,
                password: cryptPassword
            });

            console.log('Registered user ID:', registeredId); // Debugging line

            // If user is successfully registered, get user data
            if (registeredId) {
                const userData = await userModel.findById(registeredId);

                console.log('User data retrieved:', userData); // Debugging line

                // Store user info in session
                req.session.user = {
                    username: userData.username,
                    user_id: userData.id
                };

                return res.render('register', { message: 'User registered successfully!' });
            }
        } catch (err) {
            console.error(err);
            return res.render('register', { message: 'An error occurred, please try again later.' });
        }
    }
}

module.exports = new userController();

