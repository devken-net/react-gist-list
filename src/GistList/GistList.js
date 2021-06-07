import { Button, Col, Collapse, List, Row, Spin, Tag, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllGistForks } from './GistListAction';
import ForksAvatar from '../ForksAvatar';
import './GistList.scoped.css';

const { Panel } = Collapse;
const { Title } = Typography;

function GistListComponent() {
  const { gistList } = useSelector(state => state);
  const gistListArr = gistList && Object.values(gistList);

  const dispatch = useDispatch();
  const onCollapsed = (key) => {
    // return null if gist is `undefined` or `null` or if `forks` is already fetched
    if (!gistList[key] || gistList[key]?.forks) return;

    const { id, forks_url } = gistList[key];
    // fetch gist forks on Panel is open
    dispatch(getAllGistForks(id, forks_url));
  }

  return (
    <section className="pa-4">
      <Collapse onChange={onCollapsed} accordion>
        { 
          gistList && gistListArr.map(gist => (
            <Panel key={gist.id} 
              showArrow={false}
              header={
                <Title level={5} className="panel-title mb-0">{gist?.owner?.login} / { gist?.files && Object.keys(gist.files)[0] }</Title>
              }
            >
              <Row align="middle" justify="start" gutter="12" className="my-4">
                <Col flex="none" className="pr-4">
                  <Title level={5}>{ gist?.description || 'No available description' }</Title>
                </Col>
              </Row>
              <Row align="middle" justify="start" gutter="12" className="my-4">
                <Col flex="100px" className="pr-4"> Forked By: </Col>
                <Col flex="auto">
                  {
                    gist?.forks ?
                    <ForksAvatar forks={gist?.forks} html_url={gist?.html_url} /> :
                    <Spin />
                  }
                </Col>
              </Row>
              <Row align="top" justify="start" gutter="12" className="my-4">
                <Col flex="100px" className="pr-4"> Files: </Col>
                <Col flex="auto" className="pr-4">
                  <List
                    bordered
                    dataSource={ gist?.files && Object.values(gist.files) }
                    renderItem={item => (
                      <List.Item>
                        <Button type="link" href={`${ gist?.html_url }#file-${ item?.filename }`} target="_blank" className="mx-2 pa-0">
                          { item?.filename }
                        </Button>
                          <Tag color="blue">{ item?.language }</Tag>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Panel>
          )) 
        }
      </Collapse>
    </section>
  );
}

export default GistListComponent;