import React, { createContext, useEffect, useReducer } from 'react';

type User = {
  id?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  image?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type UserObject = {
  user: User | null;
};

type LoginAction = {
  type: 'LOGIN';
  userData: User;
};

type LogoutAction = {
  type: 'LOGOUT';
};

type ActionType = LoginAction | LogoutAction;

const InitialState: UserObject = {
  user: null,
};

const UserContext: React.Context<{
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}> = createContext({
  user: null as User | null,
  login: (_userData) => {},
  logout: () => {},
});

const UserReducer = (state: UserObject, action: ActionType) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.userData,
      };

    case 'LOGOUT':
      return {
        user: null,
      };

    default:
      return state;
  }
};

const UserProvider = (props: any) => {
  const [state, dispatch] = useReducer(UserReducer, InitialState);

  const login = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData));

    dispatch({
      type: 'LOGIN',
      userData,
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT',
    });
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if (userData) {
      login(JSON.parse(userData));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
      {...props}
    />
  );
};

export { UserContext, UserProvider };
