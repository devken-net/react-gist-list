import logo from './logo.svg';
import { Input, Row, Col, Card } from 'antd';
import './App.css';

const { Search } = Input;


function App() {
  const onSearch = (username) => { console.log(username) }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h1 className="text-center">GithubGist</h1>
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
                onSearch={onSearch}
              />
            </Col>
          </Row>
        </div>
      </header>
    </div>
  );
}

export default App;
