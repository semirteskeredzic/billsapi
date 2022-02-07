const express = require('express')
const router = require('./router')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()


const PORT = process.env.PORT || 8000;

const app = express()
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.listen(PORT, async() => {
    console.log(`server running on port ${PORT}`)
})



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router)

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.log(`This is the error: ${err}`)
})