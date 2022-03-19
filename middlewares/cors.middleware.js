const accessAllowList = [
  'localhost:3000',
  'http://localhost:3000',
];

const DEFAULT_EXTENDED_CORS_METHODS = ['HEAD', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const corsHeandler = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const isAllowOrigin = accessAllowList.includes(origin);
  if (!isAllowOrigin) {
    return res.end();
  }
  res.header('access-allow-origin', origin);
  if (method === 'OPTIONS') {
    res.header('access-allow-headers', requestHeaders);
    res.header('access-allow-methods', DEFAULT_EXTENDED_CORS_METHODS);
    res.end();
  }
  next();
};

module.exports = corsHeandler;
