import { Box, Button, Heading, Stack } from '@chakra-ui/react';

import { useAuth } from 'hooks';
import Header from 'components/Header';

const AuthPage = () => {
  const { handleLogin, handleSignUp } = useAuth();

  return (
    <Box height="100%">
      <Header />
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box>
          <Heading fontSize="2xl">Welcome 👋🏻</Heading>
        </Box>
        <Stack minWidth="sm" spacing={4}>
          <Button colorScheme="blue" size="lg" onClick={handleLogin}>
            Log In
          </Button>
          <Button size="lg" onClick={handleSignUp}>
            Create Account
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AuthPage;
