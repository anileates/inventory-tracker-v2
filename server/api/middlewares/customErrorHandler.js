const { prisma, Prisma } = require('@prisma/client');
const CustomError = require('../helpers/CustomError')

const customErrorHandler = (err, req, res, next) => {
    let customError = err;

    console.log(`🔥 ${err}`)
    console.log(`🔥 ${err.code}`)

    if (err.name === 'SyntaxError') {
        customError = new CustomError('Unexpected Syntax', 400);
    } else if (err.code === "P2025") { //Common 'not found error' handler. This can be seperated for both Category and Product as a mıddleware.
        customError = new CustomError('There is no record with that id', 400)
    } else if (err instanceof Prisma.PrismaClientValidationError) {
        customError = new CustomError('Unknown places detected. Check your inputs.', 400)
    }else if (err.code === 'P2003'){
        customError = new CustomError('There is no category with that id', 400)
    }

    res.status(customError.status || 500).json({
        success: false,
        message: customError.message || "Internal Server Error"
    })
}

module.exports = customErrorHandler