import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "lib/jwtService";
import { fetchUserStats } from "lib/hasuraService";
import { JwtPayload } from "jsonwebtoken";

interface StatsProps extends JwtPayload {
  issuer: string;
  videoId: number;
  publicAddress: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const videoId = req.query.videoId;

      const authenticated = verifyToken(req.cookies.token) as StatsProps;
      if (!authenticated) {
        return res.status(403).end();
      }

      if (!videoId) {
        return res.status(404).json({ message: "videoId not provided" });
      }

      const videoStats = await fetchUserStats(
        { videoId: Number(videoId), userId: authenticated.issuer },
        req.cookies.token
      );
      res.status(200).json({ videoStats });
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
