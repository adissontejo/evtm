const userDefaults = {
  name: 'User Name',
  email: 'user@email.com',
  password: 'userpassword',
};

const mockConsts = {
  createUserBody: () => ({ user: { ...userDefaults } }),

  createSessionBody: () => {
    const user = { ...userDefaults };

    delete user.name;

    return { user };
  },

  deleteUserBody: () => {
    const user = { ...userDefaults };

    delete user.name;
    delete user.email;

    return { user };
  },

  localSession: () => ({ userId: 'userid' }),
};

export default mockConsts;
