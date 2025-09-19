module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
    apiToken: {
      salt: 'Iu8XphFP3OuJUCaQ50ywgA=='
    },
  transfer: {
    token: {
      salt: 'p+PWgprwos+5erSiol3LuQ=='
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
