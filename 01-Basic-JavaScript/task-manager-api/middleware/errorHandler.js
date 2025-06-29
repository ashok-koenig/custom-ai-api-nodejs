const errorHandler = (err, req, res, next) => {
    console.log("Error: ", err.message)
    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Something went wrong"
    })
}

module.exports = errorHandler