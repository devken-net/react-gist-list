import { Input, Row, Col } from 'antd';
import { useDispatch } from "react-redux";
import { getAllUserGists } from './SearchAction';

// deconstruct Search component
const { Search } = Input;

function SearchComponent() {
  const dispatch = useDispatch();
  const onSearch = (username) => { 
    // invoke action
    dispatch(getAllUserGists(username.trim()));
   }

  return <header className="App-header">
    <h1 className="text-center pt-8"><b>Github</b>Gist</h1>
    <div className="Search pa-4">
      <Row align="middle" justify="center">
        <Col flex="none" className="pr-4">
          Search
        </Col>
        <Col flex="auto">
          <Search
            placeholder="username"
            allowClear
            enterButton="Search"
            size="large"
            value="jmk2142"
            onSearch={onSearch}
          />
        </Col>
      </Row>
    </div>
  </header>
}

export default SearchComponent;