const { expressjwt: jwt } = require("express-jwt");



const authJwt = () => {
  const secret = process.env.JWT_SECRET;
  const api = process.env.API_URL;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked:async function isRevoked(req, object) {
      // console.log('object', object);
      if (object.payload.isAdmin === false) {
        // console.log('This is not admin');
        return true;
      }
         
      // console.log('This is admin');
      return false;
    },
  }).unless({
    path: [
      {
        url: /\/public\/uploads(.*)/,
        // url:"/api/v1/products",
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/products(.*)/,
        // url:"/api/v1/products",
        methods: ["GET", "OPTIONS"],
      },
      {
        url: /\/api\/v1\/categories(.*)/,
        // url:"/api/v1/products",
        methods: ["GET", "OPTIONS"],
      },
      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
};

module.exports = authJwt;
