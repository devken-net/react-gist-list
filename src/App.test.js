import './matchmedia.mock';
import { Provider } from "react-redux";
import { createStore } from "redux";
import { initialState, reducer } from "./App.reducer";
import { render, fireEvent, waitFor, cleanup } from "@testing-library/react";

import App from './App';

function renderWithProviders(ui, { reduxState } = {}) {
  const store = createStore(reducer, reduxState || initialState);
  return render(<Provider store={store}>{ui}</Provider>);
}

const mockedAxios = {
  get: jest.fn().mockResolvedValue()
};
const mockedGistsResponse = [
  {
    "forks_url": "https://api.github.com/gists/4f2de8349de75262ffc00d353172abaf/forks",
    "id": "4f2de8349de75262ffc00d353172abaf",
    "html_url": "https://gist.github.com/4f2de8349de75262ffc00d353172abaf",
    "files": {
      ".eslintrc.json": {
        "filename": ".eslintrc.json",
        "type": "application/json",
        "language": "JSON with Comments",
      },
      "init.coffee": {
        "filename": "init.coffee",
        "type": "text/x-coffescript",
        "language": "CoffeeScript",
      },
      "keymap.cson": {
        "filename": "keymap.cson",
        "type": "text/plain",
        "language": "CSON",
      },
    },
    "description": "MSTU5013 Sync-Settings",
    "user": null,
    "owner": {
      "login": "markortiz",
      "id": 13051415,
      "avatar_url": "https://avatars.githubusercontent.com/u/13051415?v=4",
    },
  },
  {
    "forks_url": "https://api.github.com/gists/20b87421a033d2cd11935618d3b60ba9/forks",
    "id": "20b87421a033d2cd11935618d3b60ba9",
    "html_url": "https://gist.github.com/20b87421a033d2cd11935618d3b60ba9",
    "files": {
      "Mini-Problem: Javascript Part I.md": {
        "filename": "Mini-Problem: Javascript Part I.md",
        "type": "text/markdown",
        "language": "Markdown",
      }
    },
    "description": null,
    "owner": {
      "login": "markortiz",
      "id": 13051415,
      "avatar_url": "https://avatars.githubusercontent.com/u/13051415?v=4",
    },
  },
  {
    "forks_url": "https://api.github.com/gists/9a46176c8f0d625e665c49fc60dad243/forks",
    "id": "9a46176c8f0d625e665c49fc60dad243",
    "html_url": "https://gist.github.com/9a46176c8f0d625e665c49fc60dad243",
    "files": {
      "TINKER - Javascript Part I.md": {
        "filename": "TINKER - Javascript Part I.md",
        "type": "text/markdown",
        "language": "Markdown",
      }
    },
    "description": "",
    "owner": {
      "login": "markortiz",
      "id": 13051415,
      "avatar_url": "https://avatars.githubusercontent.com/u/13051415?v=4",
    },
  },
]

afterEach(cleanup);

it('render without error', () => {
  const { getByText } = renderWithProviders(<App />, { initialState: { gistList: {} } })

  expect(getByText(/Github/gm)).toBeInTheDocument()
})
it('has a search bar', () => {
  const { getByText, getByTestId } = renderWithProviders(<App />, { initialState: { gistList: {} } })

  expect(getByText(/Search/gm)).toBeInTheDocument()
  expect(getByTestId('searchInput')).toBeInTheDocument()
})
xit('should be able to search gists by username', async () => {
  mockedAxios.get.mockResolvedValueOnce(mockedGistsResponse);
  const { getByText, getByTestId } = renderWithProviders(<App />, { initialState: { gistList: {} } })
  const searchInput = getByTestId('searchInput')

  expect(searchInput).toBeInTheDocument()

  fireEvent.focus(searchInput);
  fireEvent.change(searchInput, { target: { value: 'markortiz' } });
  expect(searchInput.value).toEqual('markortiz')

  fireEvent.focus(searchInput);
  fireEvent.keyDown(searchInput, { key: 'Enter', code: '13' })
  await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1))
  await waitFor(() => {
    expect(getByText('markortiz')).toBeInTheDocument();
  });
})