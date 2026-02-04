// just creating base structure for auth controllers 

exports.register = async (req, res) => {
    res.status(200).json({ message: "reg endpoint works" });
};

exports.login = async (req, res) => {
    res.status(200).json({message: "login endpoint works"});
};