const getUsers = `
    query GetUsers {
        users {
            id
            publicAddress
        }
    }
`;

const getStats = `
    query GetUsers {
        stats {
            favourited
            id
            userId
            videoId
            watched
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

export { getStats, getUsers, getUser };
