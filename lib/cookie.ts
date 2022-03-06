import { NextApiResponse } from "next";
import cookie from "cookie";

const MAX_AGE = 7 * 24 * 60 * 60;

const setTokenCookie = (token: string, res: NextApiResponse) => {
  const cookieToken = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    sameSite: "strict",
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
  });

  res.setHeader("Set-Cookie", cookieToken);
};

const removeTokenCookie = (res: NextApiResponse) => {
  const cookieToken = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookieToken);
};

// const removeUserIdCookie = (res: NextApiResponse) => {
//   const cookieUserId = cookie.serialize("userId", "", {
//     maxAge: -1,
//     path: "/",
//   });

//   res.setHeader("Set-Cookie", cookieUserId);
// };

// const setUserIdCookie = (userId: string, res: NextApiResponse) => {
//   const cookieToken = cookie.serialize("userId", userId, {
//     maxAge: MAX_AGE,
//     expires: new Date(Date.now() + MAX_AGE * 1000),
//     sameSite: "strict",
//     httpOnly: true,
//     path: "/",
//     secure: process.env.NODE_ENV === "production",
//   });

//   res.setHeader("Set-Cookie", cookieToken);
// };

export { setTokenCookie, removeTokenCookie };
