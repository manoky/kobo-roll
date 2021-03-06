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

const getWatchedVideos = `
  query GetWatched($userId: String!) {
    stats(where: {watched: {_eq: true}, userId: {_eq: $userId}}) {
      videoId
      imgUrl
    }
  }
`;

const getUserList = `
query GetUserList($userId: String!) {
  stats(where: {userId: {_eq: $userId}, favourited: {_eq: 1}}) {
    id
    imgUrl
    userId
    videoId
    watched
  }
}
`;

export { getUsers, getUser, getStatsByUserId, getWatchedVideos, getUserList };
