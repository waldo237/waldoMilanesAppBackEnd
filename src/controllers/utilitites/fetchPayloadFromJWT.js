/**
 * @function fetchPayloadFromJWT it receives JWT token, fetches payload and returns it
 * @param token a valid  JWT token
 */
const fetchPayloadFromJWT = (token) => JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
