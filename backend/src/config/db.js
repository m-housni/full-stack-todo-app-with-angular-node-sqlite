const db = {
    users: [
      {
        email: "email@email.com",
        password: "123123",
      },
    ],
  };
  
  export const connectDB = async () => {
    return await db;
  };
  
  export default {
    connectDB,
  };
  