export default (currentState = {}, action) => {
  const { payload } = action;
    switch(action.type) {
        case 'USER_LOGIN_SUCCESS':
            const nextState = {
              ...currentState,
              token: payload.accessToken,
              email: payload.user.email,
              _id: payload.user._id,

              isLoggedIn: true
            }
            return nextState;
        default:
            return currentState;
    }
};
