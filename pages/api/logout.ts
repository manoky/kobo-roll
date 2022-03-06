import { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import { removeTokenCookie } from "lib/cookie";
import { verifyToken } from "lib/jwtService";

const magic = new Magic(process.env.MAGIC_API_SECRET || "");
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const auth = verifyToken(req.cookies.token);
      await magic.users.logoutByIssuer(auth?.userId ?? "");
      removeTokenCookie(res);

      res.writeHead(302, { Location: "/login" });
      res.end();
    } catch (err) {
      res.status(400).json({ message: "an error occurred logging out", err });
      console.error(err);
    }
  } else {
    res.status(405).json({ message: `method is not allowed ${req.method}` });
  }
};

export default handler;
