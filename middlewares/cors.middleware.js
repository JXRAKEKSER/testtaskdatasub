const accessAllowList = [
  'localhost:3000',
  'http://localhost:3000',
];

const DEFAULT_EXTENDED_CORS_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const corsHandler = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const isAllowOrigin = accessAllowList.includes(origin);
  if (!isAllowOrigin) {
    return res.end();
  }
  res.header('Access-Control-Allow-Origin', origin);
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Methods', DEFAULT_EXTENDED_CORS_METHODS);
    return res.end();
  }
  next();
};

module.exports = corsHandler;
