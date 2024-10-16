import express from 'express'; 
import errorHandler from '../middlewares/error.middleware.js'; 
import router from '../routes/index.route.js'; 
import formData from 'express-form-data';
import cors from 'cors';
import cookieParser from 'cookie-parser';

function createServer () {
    const app = express()

    app.use(cookieParser());
    // Form type
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(formData.parse())

    // Setup Cross-Origin Resource Sharing 
    // to enable passing requests through the frontend
    app.use(cors()) 

    // Route link
    app.use('/api', router)

    // Error Handler
    app.use(errorHandler)

    return app
}


export default createServer