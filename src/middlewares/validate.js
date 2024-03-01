module.exports = {
  body: (...allowedKeys) => {
    return (req, res, next) => {
      const { body } = req;
      const sanitizeKey = Object.keys(body).filter((key) =>
        allowedKeys.includes(key),
      );
      const newBody = {};
      for (let key of sanitizeKey) {
        Object.assign(newBody, { [key]: body[key] });
      }
      req.body = newBody;
      next();
      if (Object.keys(newBody).length === 0)
        return res.status(400).json({ message: "Please Insert Requirement" });

      if (Object.keys(newBody).length !== allowedKeys.length)
        return res.status(400).json({ message: " Input key does not match " });
    };
  },

  params: (...allowedKeys) => {
    return (req, res, next) => {
      const { params } = req;
      const sanitizedKey = Object.keys(params).filter((key) =>
        allowedKeys.includes(key),
      );
      const newParams = {};
      for (let key of sanitizedKey) {
        Object.assign(newParams, { [key]: params[key] });
      }
      req.params = newParams;
      next();
    };
  },
};
