import { Input, Row, Col, Card } from 'antd';
const { Search } = Input;

function SearchContainer() {
  const onSearch = (username) => { console.log(username) }

  return <header className="App-header">
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
}

export default SearchContainer;