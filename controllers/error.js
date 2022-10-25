const clientError = (req, res) => {
    res.status(404).send('404 Not Found');
};

const serverError = (err,req, res) => {
    res.status(500).send({
        error: err.message
    });
};

module.exports={
    clientError,
    serverError
}