require('dotenv').config()
const express = require("express")
const app = express()
const postsRouter = require('./routes/posts.router')
const authRouter = require('./routes/auth.router')
const commentRouter = require('./routes/comment.router')
const userRouter = require('./routes/user.router')
const likeRouter = require('./routes/like.router')
const cookieParser = require('cookie-parser')


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.use(cookieParser())

app.use("/api/v1/posts", postsRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/like", likeRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log("Server is running....")
})