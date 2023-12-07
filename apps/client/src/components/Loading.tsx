import { Flex, Spinner } from '@chakra-ui/react';

import Header from './Header';

const Loading = () => {
  return (
    <Flex
      width="100%"
      height="100dvh"
      alignItems="center"
      justifyContent="center"
    >
      <Header />
      <Spinner size="lg" />
    </Flex>
  );
};

export default Loading;
