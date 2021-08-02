const { PrismaClient } = require('@prisma/client')
const express = require('express');
const indexRouter = require('./api/routes/indexRouter');
const customErrorHandler = require('./api/middlewares/customErrorHandler')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/v1', indexRouter);
app.use(customErrorHandler)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})