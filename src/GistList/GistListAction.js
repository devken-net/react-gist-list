
import axios from "axios";

const getAllGistForks = (id, forks_url) => {
  return dispatch => {
    axios.get(forks_url)
    .then(res => {
      dispatch({
        type: "FETCH_FORKS",
        data: {
          id,
          forks: res.data
        }
      })
    }

    )
  };
}

export {
  getAllGistForks,
}
