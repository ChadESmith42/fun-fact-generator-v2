export function ensureJwt(req, res, next) {
  const authorizationHeader = req.headers["authorization"];

  if (authorizationHeader) {
    const [bearerKeyword, bearerToken] = authorizationHeader.split(" ");

    if (bearerKeyword === "Bearer" && bearerToken) {
      req.token = bearerToken;
      next();
      return;
    }
  }

  res.sendStatus(403);
}
