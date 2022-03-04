import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "lib/jwtService";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      console.log(verifyToken(req.cookies.token));
      if (!req.cookies.token) {
        return res.status(403).end();
      }

      res.status(200).json({ message: "got it" });
    } else {
      res.status(405).json({ message: `method not allowed ${req.method}` });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }

    res.status(403).json({ message: "request could not be completed" });
  }
};

export default handler;
