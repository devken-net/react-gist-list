import { Avatar, Button, Col, Collapse, List, Row, Tag, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllGistForks } from './GistListAction';
import './GistList.css';

const { Panel } = Collapse;

function GistListComponent() {
  const { gistList } = useSelector(state => state);
  const gistListArr = gistList && Object.values(gistList);

  const dispatch = useDispatch();
  const onCollapsed = (key) => {
    if (!gistList[key]) return;
    const { id, forks_url } = gistList[key];
    dispatch(getAllGistForks(id, forks_url));
  }

  const ForkedBy = ({ forks, html_url }) => {
    if (!forks || forks.length < 1) return <Avatar style={{ color: '#3c9ae8', backgroundColor: '#111d2c' }}>0</Avatar>;
    const lastThreeForks = forks.slice(-3, forks.length);
    const otherForksCount = forks.length > 3 ? forks.length-3 : 0

    return <>
      {
        lastThreeForks.map(fork => 
          <Tooltip key={ fork?.id } title={fork?.owner?.login} placement="top">
            <Button type="link" href={fork?.html_url} target="_blank" className="mx-1 pa-0">
              <Avatar src={ fork?.owner?.avatar_url } />
            </Button>
          </Tooltip>
        )
      }
      {
        !!otherForksCount &&
        <Tooltip title="View All" placement="top">
          <Button type="link" href={`${html_url}/forks`} target="_blank" className="mx-1 pa-0">
            <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>+{ otherForksCount }</Avatar>
          </Button>
        </Tooltip>
      }
    </>
  }

  return (
    <section className="pa-4">
      <Collapse onChange={onCollapsed} accordion>
        { 
          gistList && gistListArr.map(gist => (
            <Panel key={gist.id} 
              showArrow={false}
              header={
                <Button type="link" block size="large" className="text-left">
                  {gist?.owner?.login} / { gist?.files && Object.keys(gist.files)[0] }
                </Button>
              }
            >
              <Row align="middle" justify="start" gutter="12" className="my-4">
                <Col flex="none" className="pr-4">
                  { gist?.description || 'No available description' }
                </Col>
              </Row>
              <Row align="middle" justify="start" gutter="12" className="my-4">
                <Col flex="200px" className="pr-4"> Forked By: </Col>
                <Col flex="auto">
                  {
                    ForkedBy(gist)
                  }
                </Col>
              </Row>
              <Row align="top" justify="start" gutter="12" className="my-4">
                <Col flex="200px" className="pr-4"> Files: </Col>
                <Col flex="auto" className="pr-4">
                  {
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
                  }
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