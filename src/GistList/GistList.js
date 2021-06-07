import { Avatar, Button, Col, Collapse, Row, Tooltip } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllGistForks } from './GistListAction';
import './GistList.css';

const { Panel } = Collapse;

function GistListComponent() {
  const { gistList } = useSelector(state => state);
  const gistListArr = gistList && Object.values(gistList);

  const dispatch = useDispatch();
  const onCollapsed = (key) => {
    const { id, forks_url } = gistList[key];
    dispatch(getAllGistForks(id, forks_url));
  }

  const ForkedBy = (forks) => {
    if (!forks) return;
    const lastThreeForks = forks.slice(-3, forks.length);

    return <>
      {
        lastThreeForks.map(fork => 
          <Tooltip title={fork?.owner?.login} placement="top" className="mx-2">
            <Button type="link" href={fork?.html_url} target="_blank">
              <Avatar src={ fork?.owner?.avatar_url } />
            </Button>
          </Tooltip>
        )
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
              <Row align="middle" justify="start" gutter="12">
                <Col flex="none" className="pr-4">
                  { gist?.description || 'No available description' }
                </Col>
              </Row>
              <Row align="middle" justify="start" gutter="12">
                <Col flex="none" className="pr-4"> Forks: </Col>
                <Col flex="auto" className="pr-4"> { gist?.forks?.length } </Col>
              </Row>
              <Row align="middle" justify="start" gutter="12">
                <Col flex="none" className="pr-4"> Forked By: </Col>
                <Col flex="auto" className="pr-4">
                  {
                     ForkedBy(gist?.forks)
                  }
                </Col>
              </Row>
              <Row align="middle" justify="start" gutter="12">
                <Col flex="none" className="pr-4"> Files: </Col>
                <Col flex="auto" className="pr-4">
                  {
                     ForkedBy(gist?.forks)
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