import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "lib/jwtService";
import { updateOrInsertStats, fetchUserStats } from "lib/hasuraService";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      const { videoId, watched, favourited, imgUrl } = req.body;

      const authenticated = verifyToken(req.cookies.token);
      if (!authenticated) {
        return res.status(403).end();
      }

      if (!videoId) {
        return res.status(404).json({ message: "videoId not provided" });
      }

      const movieStats = await updateOrInsertStats(
        { videoId, userId: authenticated.userId, watched, favourited, imgUrl },
        req.cookies.token
      );
      res.status(200).json({ movieStats });
    }

    if (req.method === "GET") {
      const { videoId } = req.query;

      const authenticated = verifyToken(req.cookies.token);
      if (!authenticated) {
        return res.status(403).json({ message: "user not authenticated" });
      }

      if (!videoId) {
        return res.status(404).json({ message: "videoId not provided" });
      }

      const movieStats = await fetchUserStats(
        { videoId: Number(videoId), userId: authenticated.userId },
        req.cookies.token
      );

      res.status(200).json({ ...movieStats.stats[0] });
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
