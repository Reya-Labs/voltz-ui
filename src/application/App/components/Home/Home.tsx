import { Agents } from '@theme';
import { Button } from '@components/atomic';

const Home = () => {
  return <Button agent={Agents.FIXED_TRADER}>Home</Button>;
};

export default Home;
