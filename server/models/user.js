const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        validate: {
            validator: function (value) {
                return /[A-Za-z0-9_.]+@[A-Za-z0-9_.]+/.test(value);
            },
            message: function (props) {
                return `${props.value} is not a valid email address!`;
            }
        },
        required: [true, 'E-mail address should be filled up!'],
        trim: true,
        minlength: 1
    }
});

module.exports = {
    User
}