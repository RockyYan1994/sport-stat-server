const mongoose = require('mongoose');
mongoose.connect('');
mongoose.connection
    .once('open', () => console.log("sport-stat-user-db is connected!"))
    .on('error', (error) => {
        console.warn("Warning", error);
    });