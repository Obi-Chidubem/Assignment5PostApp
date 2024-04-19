function loggedIn(req, res, next) {
  if (req.user) {
    next;
  } else {
    req.render("login");
  }
}

module.exports = { loggedIn };
