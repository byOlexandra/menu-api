export const errorHandler = (err, req, res, next) => {
    console.error("Error Middleware:", err);
    
    res.status(500).json({
        message: "❌ Server Internal Error"
    })
}