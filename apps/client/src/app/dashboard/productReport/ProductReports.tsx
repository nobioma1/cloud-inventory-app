import { Box, Button, Flex, HStack, Stack, Tag, Text } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { useAuth, useProductReports } from 'hooks';
import LoadingList from 'components/LoadingList';
import backend from 'apis/backend';

interface ProductReportsProps {
  workspaceId: string;
  productId: string;
}

const ProductReports = ({ workspaceId, productId }: ProductReportsProps) => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, data: reports = [] } = useProductReports(
    workspaceId,
    productId
  );

  const mutation = useMutation({
    mutationFn: async (attrs: { reportId: string; isResolved: boolean }) => {
      const token = await getToken();
      const values = { isResolved: !attrs.isResolved };
      return backend.patch(
        `/workspaces/${workspaceId}/products/${productId}/reports/${attrs.reportId}`,
        values,
        { headers: { ...token } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [productId, 'reports'] });
    },
  });

  const handleResolve = (reportId: string, isResolved: boolean) => {
    return () => {
      mutation.mutate({ reportId, isResolved });
    };
  };

  if (!isLoading && reports?.length === 0) {
    return (
      <Text textAlign="center" pt={6}>
        No Report added yet
      </Text>
    );
  }

  if (isLoading) {
    return <LoadingList />;
  }

  return (
    <Stack spacing={3}>
      {reports.map((report) => (
        <Stack
          spacing={2}
          borderWidth={1}
          borderRadius="md"
          padding={2}
          key={report.id}
        >
          <Flex justifyContent="space-between">
            <HStack spacing={2}>
              <Tag colorScheme="orange">{report.severity}</Tag>
              <Text
                fontSize="sm"
                alignItems="center"
                color={report.isResolved ? 'green.600' : 'orange'}
              >
                {report.isResolved ? 'Resolved' : 'Pending Resolution'}
              </Text>
            </HStack>
            {/* <Button
              size="sm"
              onClick={handleResolve(report.id, report.isResolved)}
            >
              {report.isResolved ? 'Undo resolution' : 'Resolve'}
            </Button> */}
          </Flex>
          <Text>
            <Text as="span" fontWeight="bold">
              Report:{' '}
            </Text>
            {report.report}
          </Text>
          <Box>
            <Text fontSize="sm">
              Created at:{' '}
              {dayjs(new Date(report.createdAt)).format('YYYY-MM-DD')}
            </Text>
            <Text fontSize="sm">
              Updated at:{' '}
              {dayjs(new Date(report.updatedAt)).format('YYYY-MM-DD')}
            </Text>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default ProductReports;
