import { Stack, Skeleton } from '@chakra-ui/react';

const LoadingList = () => {
  return (
    <Stack>
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export default LoadingList;
