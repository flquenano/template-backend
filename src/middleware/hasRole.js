const hasRole = (authRoles) => {
  return (req, res, next) => {
    let authorized = false;
    const { roles } = req.appIdAuthorizationContext.accessTokenPayload;
    authRoles.forEach((role) => {
      if (roles.includes(role)) {
        authorized = true;
      }
    });
    if (authorized) {
      next();
    } else {
      return res.status(403).send("Forbidden");
    }
  };
};

module.exports = { hasRole };
