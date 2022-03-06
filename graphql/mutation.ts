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
  mutation UpdateUserStats($userId: String!,
    $favourited: Int,
    $watched:Boolean,
    $videoId :Int!) {
    update_stats(where: {userId: {_eq: $userId},videoId: {_eq: $videoId}},
    _set: {favourited: $favourited, watched: $watched}) {
      returning {
        favourited
        id
        userId
        videoId
        watched
      }
    }
  }
`;

const insertUserStats = `
  mutation InsertUserStats($favourited: Int!,
    $userId: String!, $videoId: Int!, $watched: Boolean!, $imgUrl: String!) {
    insert_stats_one(object: 
      {favourited: $favourited, 
        userId: $userId,
        videoId: $videoId, watched:  $watched, imgUrl: $imgUrl}) {
          favourited
          id
          userId
          videoId
          watched
          imgUrl
    }
  }`;

export { createUser, updateUserStats, insertUserStats };
