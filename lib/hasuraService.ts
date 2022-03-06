import { MovieProps } from "types/videoTypes";
import { GRAPHQL_URL } from "constants/routes";
import {
  getUsers,
  getUser,
  getStatsByUserId,
  getWatchedVideos,
  getUserList,
} from "graphql/queries";
import { createUser, insertUserStats, updateUserStats } from "graphql/mutation";
import {
  UserType,
  VideoQueryType,
  UpdateParamsType,
  FavouriteProps,
} from "types/general";

async function fetchGraphQL<Type>(operationsDoc: string, token: string, variables: Type) {
  const result = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
    }),
  });

  return await result.json();
}

const fetchUsers = async (token: string) => {
  const { errors, data } = await fetchGraphQL(getUsers, token, {});

  return { errors, users: data?.users };
};

const fetchUser = async (issuer: string, token: string) => {
  const { errors, data } = await fetchGraphQL(getUser, token, { issuer });

  return { errors, user: data?.users.length === 0 };
};

const createNewUser = async (user: UserType, token: string) => {
  const { errors, data } = await fetchGraphQL<UserType>(createUser, token, user);

  return { errors, stats: data?.stats };
};

const fetchUserStats = async (videoQueryVariables: VideoQueryType, token: string) => {
  const { errors, data } = await fetchGraphQL(
    getStatsByUserId,
    token,
    videoQueryVariables
  );

  return { errors, stats: data?.stats };
};

const updateOrInsertStats = async (params: UpdateParamsType, token: string) => {
  const { userId, videoId } = params;
  const { stats } = await fetchUserStats({ userId, videoId }, token);

  if (stats.length > 0) {
    const { userId, videoId, watched, favourited } = params;
    const { errors, data } = await fetchGraphQL(updateUserStats, token, {
      userId,
      videoId,
      watched,
      favourited,
    });

    return { errors, stats: data?.update_stats?.returning };
  } else {
    const { errors, data } = await fetchGraphQL(insertUserStats, token, params);

    return { errors, stats: data?.insert_stats_one };
  }
};

const fetchWatchedVideos = async (userId: string, token: string) => {
  const { errors, data } = await fetchGraphQL(getWatchedVideos, token, { userId });

  return {
    errors,
    stats: data?.stats.map((movie: FavouriteProps) => ({
      id: movie.videoId,
      imgUrl: movie.imgUrl,
    })),
  };
};

const fetchUserList = async (userId: string, token: string) => {
  const { errors, data } = await fetchGraphQL(getUserList, token, { userId });

  return {
    errors,
    stats: data?.stats.map((movie: FavouriteProps) => ({
      id: movie.videoId,
      imgUrl: movie.imgUrl,
    })),
  };
};

export {
  fetchUser,
  fetchUsers,
  createNewUser,
  fetchUserList,
  fetchUserStats,
  fetchWatchedVideos,
  updateOrInsertStats,
};
