const express = require("express")
const app = express()

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

const postsRouter = require('./routes/posts.router')
const authRouter = require('./routes/auth.router')
const commentRouter = require('./routes/comment.router')

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use("/api/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/comments", commentRouter)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})