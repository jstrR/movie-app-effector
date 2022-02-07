const { AuthenticationError, UserInputError } = require('apollo-server-express');
const users = require('../db/UserDb');

module.exports = {
  Query: {
    allUsers: () => users || [],
    user: (_, args) => {
      const user = users.find(({ email, password, token }) => email === args.email && (password === args.password || token === args.token) );
      if (!user) {
        throw new Error(`No user exists with email: ${args.email} or password`);
      }
      return user;
    },
  },
  Mutation: {
    addUser: (_, args) => {
      const existedUser = users.find(user => user.email === args.email)
      if (existedUser) {
        throw new AuthenticationError('Current Email is already exist  ' + args.email);
      }
      const user = {
        ...args,
        id: Math.floor(Math.random() * 2000),
        role: 'user',
        token: args.token || '',
        password: args.password || '',
        movieRatings: []
      };
      users.push(user);
      return user;
    },
    updateUser: (_, { email, ...rest }) => {
      const existedUser = users.find(user => user.email === email)
      if (!existedUser) {
        throw new UserInputError('Current user does not exist ' + email);
      }
      const updatedUser = { ...existedUser, ...rest };
      users.forEach((user, i) => {
        return (user.id === updatedUser.id) ? users[i] = updatedUser : user
      });
      return updatedUser;
    },
  }
};
