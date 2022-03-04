import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import { createToken } from "lib/jwtService";
import { setTokenCookie } from "lib/cookie";

import { createNewUser, fetchUser } from "lib/hasuraService";

export const magic = new Magic(process.env.MAGIC_API_SECRET || "");

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substring(7) : "";

      // await magic.token.validate(didToken);
      const metadata = await magic.users.getMetadataByToken(didToken);
      const token = createToken(metadata);

      const { issuer, publicAddress } = metadata;

      if (issuer && publicAddress) {
        const isNewUser = await fetchUser(issuer, token);

        if (isNewUser.user) {
          const resp = await createNewUser({ issuer, publicAddress }, token);
          if (resp.errors) {
            throw new Error(resp.errors);
          }
        }
        setTokenCookie(token, res);
      }

      res.status(201).json({ ok: true });
    } catch (err) {
      res.status(400).json({ message: "an error occurred logging in", err });
      console.error(err);
    }
  } else {
    res.status(405).json({ message: `method is not allowed ${req.method}` });
  }
};

export default handler;
