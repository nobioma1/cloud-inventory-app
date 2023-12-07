import { Button, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

import { useAuth } from 'hooks';

const LogOut = () => {
  const { handleLogout } = useAuth();
  return (
    <Button
      size="md"
      variant="outline"
      colorScheme="red"
      leftIcon={<FiLogOut />}
      onClick={handleLogout}
    >
      Log out
    </Button>
  );
};

const Header = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Flex
      as="header"
      backgroundColor="gray.100"
      borderBottomWidth={1}
      position="fixed"
      top={0}
      left={0}
      width="100%"
    >
      <Flex
        alignItems="center"
        as="header"
        height={16}
        justifyContent="space-between"
        paddingX={3}
        margin="0 auto"
        maxW="6xl"
        flex={1}
      >
        <Link to="/w">
          <Heading
            as="h1"
            fontSize="2xl"
            fontFamily="Calistoga"
            color="blue.700"
          >
            BizInventory
          </Heading>
        </Link>

        {isAuthenticated && <LogOut />}
      </Flex>
    </Flex>
  );
};

export default Header;
