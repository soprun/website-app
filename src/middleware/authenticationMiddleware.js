const allowUrl = ['public', 'nonprivate','home'];

const authenticationMiddleware = (whiteList =[]) => (req, res, next) => {
  if(whiteList.find(req.baseUrl)) {
    next();
  }

  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/');
}
