const convertArrayToObject = (array) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item['id']]: item,
    };
  }, initialValue);
};

export const initialState = {
  gistList: {}
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_USER_GISTS":
      return {
        ...state,
        gistList: convertArrayToObject(action.data)
      };
    case "FETCH_FORKS":
      const { id, forks } = action.data;
      const gistList = state.gistList;
      gistList[id] = {
        ...gistList[id],
        forks,
      }
      return {
        ...state,
        gistList: { ...gistList }
      };
    default:
      return state;
  }
}
