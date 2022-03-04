const createUser = `
mutation CreateUser($issuer: String!, $publicAddress: String!) {
    insert_users_one(object: {issuer: $issuer, publicAddress: $publicAddress}) {
      id
      issuer
      publicAddress
    }
  }
`;

export { createUser };
