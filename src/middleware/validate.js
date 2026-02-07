const isEmail = (v) => typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

exports.validateRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ message: "username is required" });
  }
  if (!isEmail(email)) {
    return res.status(400).json({ message: "valid email is required" });
  }
  if (!password || password.length < 6) {
    return res.status(400).json({ message: "password must be at least 6 characters" });
  }

  next();
};

exports.validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ message: "valid email is required" });
  }
  if (!password) {
    return res.status(400).json({ message: "password is required" });
  }

  next();
};

exports.validateResourceCreate = (req, res, next) => {
  const { anilistId, title } = req.body;

  if (anilistId === undefined || Number.isNaN(Number(anilistId))) {
    return res.status(400).json({ message: "anilistId (number) is required" });
  }
  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "title is required" });
  }

  next();
};
