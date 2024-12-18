const userInfo = JSON.parse(localStorage.getItem("auth"));
console.log("authentication", userInfo);

const authState = userInfo
  ? { isLoggedIn: true, userInfo }
  : { isLoggedIn: false, userInfo: null };

const Authentication = (state = authState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: [action.payload],
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    case "REGISTER_SUCCES":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "REGISTER_FAIL":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };

    default:
      return state;
  }
};

export default Authentication;
