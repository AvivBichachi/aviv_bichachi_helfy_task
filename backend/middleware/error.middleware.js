module.exports = (err,req,res,next) => {
    const status = err.status || 500;
    const msg = err.message || "Internal Server Error";
    return res.status(status).json({error: msg});
}