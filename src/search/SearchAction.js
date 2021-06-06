
import axios from "axios";

const baseApiUrl = 'https://api.github.com/users';

const getAllUserGists = (username) => {
  return dispatch => {
    axios.get(`${baseApiUrl}/${username}/gists`)
    .then(res =>
      dispatch({
        type: "FETCH_USER_GISTS",
        data: res.data
      })
    )
  };
}

export {
  getAllUserGists,
}
