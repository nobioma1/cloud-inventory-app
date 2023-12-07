import { Link as RouterLink, Outlet, useLocation } from 'react-router-dom';
import { Box, Flex, Heading, Stack, Link } from '@chakra-ui/react';

import Header from 'components/Header';
import { useWorkspace } from 'hooks';

const HOME_PATH = '/w';

const Dashboard = () => {
  const { data: workspace } = useWorkspace();
  const { pathname } = useLocation();

  const isHome = pathname === HOME_PATH;

  return (
    <Flex
      height="100%"
      flexDirection="column"
      alignItems="center"
      overflowY="auto"
    >
      <Header />
      <Stack
        spacing={5}
        height="100%"
        width="100%"
        maxW="6xl"
        paddingX={3}
        paddingTop="80px"
        flexDirection="column"
      >
        <Flex
          alignItems="center"
          justifyContent={isHome ? 'flex-end' : 'space-between'}
        >
          {!isHome && (
            <Link as={RouterLink} color="blue.600" to={HOME_PATH}>
              &larr; See all Products
            </Link>
          )}
          <Heading fontSize="lg" color="gray.600">
            {workspace?.name}
          </Heading>
        </Flex>
        <Box width="100%">
          <Outlet />
        </Box>
      </Stack>
    </Flex>
  );
};

export default Dashboard;
