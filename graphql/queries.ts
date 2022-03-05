const getUsers = `
    query GetUsers {
        users {
            id
            publicAddress
        }
    }
`;

const getUser = `
    query GetUser($issuer: String!) {
        users(where: {issuer: {_eq: $issuer}}) {
            id
            issuer
            publicAddress
        }
    }
`;

const getStatsByUserId = `
  query GetVideoStatsByUserId($userId: String!, $videoId: Int!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq: $videoId}}) {
      userId
      videoId
      id
      watched
      favourited
    }
  }
`;

export { getUsers, getUser, getStatsByUserId };
