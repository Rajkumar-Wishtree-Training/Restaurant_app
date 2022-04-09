const app = require('./app')
const connectDatabase = require('./config/database')
const {createProxyMiddleware} = require('http-proxy-middleware')
const dotenv = require('dotenv')

dotenv.config({ path: 'config/config.env' });

//Connecting Database
connectDatabase()

// app.options('*', cors())

//Handling Uncaught Exception
process.on('uncaughtException', (err) => {
    console.log(`Error ${err.message}`);
    process.exit(1)
})

// app.use('/', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));

const server = app.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})

//Handling UnhandledPromiseRejection Errors
process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting Down the server due to UnhandledPromise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})