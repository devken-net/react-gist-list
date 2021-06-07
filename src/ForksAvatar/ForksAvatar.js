
import { Avatar, Button, Tooltip } from 'antd';

function ForkedByComponent({ forks, html_url }) {
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

export default ForkedByComponent;