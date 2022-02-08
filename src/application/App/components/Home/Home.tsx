import { Background } from '@theme';
import { useWallet } from '@hooks';
import { Typography } from '@components/atomic';

const Home = () => {
  const wallet = useWallet();

  return (
    <Background sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography variant="h1">Watch this space</Typography>
    </Background>
  );
};

export default Home;
