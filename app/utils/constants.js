module.exports = {
  EXPIRES_IN: () => {
    return new Date().getTime() + 120000;
  },
  ROLES: {
    USER: "USER",
    ADMIN: "ADMIN",
    WRITER: "WRITER",
    TEACHER: "TEACHER",
    SUPPLIER: "SUPPLIER",
  },
  ADMIN_ROLE: "ADMIN",
  ACCESS_TOKEN_SECRET_KEY:
    "9FA3DD5E6EC55F867DCF5F421339953605006E1EE38AB620AB577758EC67E55C",
  REFRESH_TOKEN_SECRET_KEY:
    "5D593A9270DB32D039E5E030B820F4B71E51F4176B784F78BF4342A585E4C475",
  MONGOIDPATTERN: /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/,
};
