import { UpdateParamsType } from "types/general";

const loginUser = async (token: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

const logoutUser = async () => {
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await res.json();
};

const updateFavourite = async (data: Omit<UpdateParamsType, "userId">) => {
  const res = await fetch("/api/stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const resData = await res.json();

  return resData;
};

const getMoviestats = async (videoId: number) => {
  try {
    const res = await fetch(`/api/stats?videoId=${videoId}`);
    const resData = await res.json();
    return resData;
  } catch (err) {
    console.log(err);
  }
};

export { loginUser, updateFavourite, getMoviestats, logoutUser };
