import { Input, Row, Col } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { getAllUserGists } from './SearchAction';

const { Search } = Input;

function SearchComponent() {
  const dispatch = useDispatch();
  const onSearch = (username) => { 
    // invoke action on search submit
    dispatch(getAllUserGists(username.trim()));
   }

  return <header className="App-header">
    <h1 className="text-center pt-8">
      <GithubOutlined className="px-4"/>
      <b>Github</b>Gists
    </h1>
    <div className="Search pa-4">
      <Row align="middle" justify="center">
        <Col flex="none" className="pr-4">
          Search
        </Col>
        <Col flex="auto">
          <Search
            data-testid="searchInput"
            placeholder="username"
            allowClear
            enterButton
            size="large"
            onSearch={onSearch}
          />
        </Col>
      </Row>
    </div>
  </header>
}

export default SearchComponent;