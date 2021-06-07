import { Button, Col, Collapse, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getAllGistForks } from './GistListAction';
import './GistList.css';

const { Panel } = Collapse;

function GistListComponent() {
  const { gistList } = useSelector(state => state);
  const gistListArr = gistList && Object.values(gistList);

  const dispatch = useDispatch();
  const onCollapsed = (key) => {
    console.log(gistList[key]);
    const { id, forks_url } = gistList[key];
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
                <Button type="link" block size="large" className="text-left">
                  {gist?.owner?.login} / { gist?.files && Object.keys(gist.files)[0] }
                </Button>
              }
            >
              <Row align="middle" justify="start" gutter="12">
                <Col flex="none" className="pr-4">
                  {gist?.owner?.login} / { gist?.files && Object.keys(gist.files)[0] }
                </Col>
              </Row>
              <Row align="middle" justify="start" gutter="12">
                <Col flex="none" className="pr-4">
                  Forks: { gist?.forks?.length }
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