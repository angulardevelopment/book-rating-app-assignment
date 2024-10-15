const errorHandler = (error, req, res, next) => {
    const errorStatus = error.status || 500
    const errorMessage = error.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        message: errorMessage.message,
    })
}

export default errorHandler