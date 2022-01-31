import { Background } from '@theme';
import { Typography } from '@components/atomic';

const Home = () => {
  return (
    <Background sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h1">Watch this space</Typography>
    </Background>
  );
};

export default Home;
