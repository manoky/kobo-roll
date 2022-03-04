import { GRAPHQL_URL } from "constants/routes";
import { getStats, getUsers, getUser } from "graphql/queries";
import { createUser } from "graphql/mutation";
import { UserType } from "types/general";

async function fetchGraphQL<Type>(
  operationsDoc: string,
  token: string,
  variables: Type
) {
  const result = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      //   "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_SECRET || "",
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
  const { errors, data } = await fetchGraphQL<UserType>(
    createUser,
    token,
    user
  );

  return { errors, stats: data?.stats };
};

const fetchStats = async (token: string) => {
  const { errors, data } = await fetchGraphQL(getStats, token, {});

  return { errors, stats: data?.stats };
};

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

export { fetchStats, fetchUsers, fetchUser, createNewUser, loginUser };
