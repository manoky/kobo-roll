const createUser = `
mutation CreateUser($issuer: String!, $publicAddress: String!) {
    insert_users_one(object: {issuer: $issuer, publicAddress: $publicAddress}) {
      id
      issuer
      publicAddress
    }
  }
`;

const updateUserStats = `
  mutation UpdateUserStats($userId: String!) {
    update_stats(where: {userId: {_eq: $userId}},
    _set: {favourited: 10, watched: false}) {
       favourited
      id
      userId
      videoId
      watched
    }
  }
`;

const insertUserStats = `
  mutation InsertUserStats($favourited: Int!, $userId: String!, $videoId: Int!, $watched: Boolean!) {
    insert_stats_one(object: {favourited: $favourited, userId: $userId, videoId: $videoId, watched:  $watched}) {
      favourited
      id
      userId
      videoId
      watched
    }
  }`;

export { createUser, updateUserStats, insertUserStats };
