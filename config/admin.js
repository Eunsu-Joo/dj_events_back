module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '4b22baf2eb6cb3882cb21b6cc4aef4d2'),
  },
});
