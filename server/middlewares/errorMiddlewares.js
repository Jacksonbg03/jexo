const routeNotFound = (req, res, next) => {
    const err = new Error(`Route Not Found: ${req.originalUrl}`);
    res.status(404);
    next(err);
}

const errorHandler = (err, req, res, next) => {
    let statCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message
    
    if(err.name === "CastError" && err.kind === "ObjectId"){
        statCode = 404;
        message = "Resource Not Found!";
    }

    res.status(statCode).json({
        message: message,
        stack: process.env.NODE_ENV != "production" ? null : err.stack
    })
}

export {routeNotFound, errorHandler};