import { Card } from 'antd';
import { useSelector } from "react-redux";


function GistListComponent() {

  const { gistList } = useSelector(state => state.searchReducer); //this hook gives us redux store state
  const gistListArr = gistList && Object.values(gistList);

  return (
    <section className="GistList">
      <h5>Gist List</h5>
        { gistList && gistListArr.map(gist => (
            <Card key={gist.id} title={gist?.files && Object.keys(gist.files)[0]}>
              <p>{ gist?.description || 'No description available.'}</p>
            </Card>
        )) }
    </section>
  );
}

export default GistListComponent;