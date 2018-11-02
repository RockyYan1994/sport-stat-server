const mongoose = require('mongoose');
mongoose.connect('mongodb://lgnb:lgnb666@ds147723.mlab.com:47723/sport-stat-user');
mongoose.connection
    .once('open', () => console.log("sport-stat-user-db is connected!"))
    .on('error', (error) => {
        console.warn("Warning", error);
    });