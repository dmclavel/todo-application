const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://dmc-todo-server:thehobbit2014@mongodb-782-0.cloudclusters.net/TodoApp?authSource=admin', { useNewUrlParser: true });

module.exports = {
    mongoose
};   
