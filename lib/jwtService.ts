import jwt, { JwtPayload } from "jsonwebtoken";
import { MagicUserMetadata } from "@magic-sdk/admin";

const createToken = (metadata: MagicUserMetadata) => {
  const token = jwt.sign(
    {
      ...metadata,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["admin", "user"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": metadata.issuer,
      },
    },
    process.env.JWT_SECRET || ""
  );

  return token;
};

const verifyToken = (token: string)  => {
  const decode = jwt.verify(token, process.env.JWT_SECRET || "");

  return decode;
};

export { createToken, verifyToken };
