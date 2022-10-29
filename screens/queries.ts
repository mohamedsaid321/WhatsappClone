export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      status
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
          chatRoom {
            id
            chatRoomUsers {
              items {
                user {
                  id
                  name
                  imageUri
                  status
                }
              }
            }
            lastMessage {
              id
              content
              updatedAt
              user {
                id
                name
              }
            }
          }
        }
      }
      createdAt
      updatedAt
    }
  }
`;
