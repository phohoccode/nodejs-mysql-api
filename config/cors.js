require('dotenv').config()

const allowedOrigins = [
    'https://phosocial.vercel.app',
    'http://localhost:3000',
];

const configCors = (app) => {
    app.use(function (req, res, next) {
        const origin = req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });
}

module.exports = configCors