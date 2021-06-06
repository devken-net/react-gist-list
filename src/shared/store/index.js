function reducer(state = { gistList: {} }, action) {
  switch (action.type) {
    case "FETCH_USER_GISTS":
      return {
        ...state,
        gistList: action.data
      };
    default:
      return state;
  }
}

export default reducer;