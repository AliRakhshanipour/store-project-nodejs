const crypto = require("crypto");
const key = crypto.randomBytes(32).toString("hex").toUpperCase();
console.log(key);
//9FA3DD5E6EC55F867DCF5F421339953605006E1EE38AB620AB577758EC67E55C
//5D593A9270DB32D039E5E030B820F4B71E51F4176B784F78BF4342A585E4C475
//98E4C09B0175F69C31AC1F1D90CDDBB65CB1AA684C9DB942D814DC9E20DB2AF0
