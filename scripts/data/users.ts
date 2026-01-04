import bcrypt from "bcryptjs";

const users = [
  {
    email: "ssakib6060@gmail.com",
    password: bcrypt.hash("password", 10).then((e) => e),
    name: "Sadman Sakib",
    isAdmin: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    email: "john@example.com",
    password: bcrypt.hash("password", 10).then((e) => e),
    name: "John Doe",
    isAdmin: false,
    isVerified: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export { users };
