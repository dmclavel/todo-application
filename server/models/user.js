const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('User', {
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return validator.isEmail(value);
            },
            message: function (props) {
                return `${props.value} is not a valid email address!`;
            }
        },
        required: [true, 'E-mail address should be filled up!'],
        trim: true,
        minlength: 1,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

module.exports = {
    User
}