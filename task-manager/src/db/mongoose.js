const mongoose = require('mongoose')

mongoose.connect(process.env.LOCAL_MONGO_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})