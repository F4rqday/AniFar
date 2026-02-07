module.exports = (err, req, res, next) => {
    console.error(err);

    if (err.name = "ValidationErorr"){
        return res.status(400).json({
            message: "Validation Error",
            errors: err.errors,
        });
    }



    if (err.name == "CastError"){
        return res.status(400).json({message: "Invalid id Format"});
    }


    return res.status(err.status || 500).json({
        message: err.message || "server error",
    })
}