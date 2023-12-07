import { useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { MdOutlineReportGmailerrorred } from 'react-icons/md';

import { useProduct, useWorkspace } from 'hooks/queries';
import ProductReportForm from './ProductReportForm';
import ProductReports from './ProductReports';

const ProductReportPage = () => {
  const { productId } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: workspace } = useWorkspace();
  const { data: product } = useProduct(productId ?? '', workspace?.id);

  return (
    <>
      <Stack spacing={5}>
        <Flex alignItems="center" justifyContent="space-between">
          <Stack spacing={1}>
            <Heading fontSize="2xl" color="gray.700">
              Product Reports
            </Heading>
            <Box>
              <Text fontSize="sm" color="gray.600">
                Product Identifier:{' '}
                <Text as="span" fontWeight="bold">
                  {product?.id.split('-')[0].toUpperCase()}
                </Text>
              </Text>
              <Text fontSize="sm" color="gray.600">
                Product Name:{' '}
                <Text as="span" fontWeight="bold">
                  {product?.name}
                </Text>
              </Text>
            </Box>
          </Stack>
          <Button
            onClick={onOpen}
            colorScheme="orange"
            leftIcon={<MdOutlineReportGmailerrorred size={22} />}
          >
            Add New Report
          </Button>
        </Flex>

        {product?.id && workspace?.id && (
          <ProductReports workspaceId={workspace?.id} productId={product?.id} />
        )}
      </Stack>
      {isOpen && product && (
        <ProductReportForm isOpen onClose={onClose} product={product} />
      )}
    </>
  );
};

export default ProductReportPage;
