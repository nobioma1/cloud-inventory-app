import { useState } from 'react';
import { Button, Flex, Heading, Stack, useDisclosure } from '@chakra-ui/react';
import { MdOutlineLibraryAdd } from 'react-icons/md';

import { useWorkspace } from 'hooks';
import ProductForm from './ProductForm';
import Products from './Products';
import { Product } from 'types/Product';

const ProductPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: workspace } = useWorkspace();
  const [product, setProduct] = useState<Product | null>(null);

  const onEdit = (product: Product) => {
    setProduct(product);
    onOpen();
  };

  const handleClose = () => {
    setProduct(null);
    onClose();
  };

  return (
    <>
      <Stack spacing={5}>
        <Flex alignItems="center" justifyContent="space-between">
          <Heading fontSize="2xl" color="gray.700">
            Products
          </Heading>
          <Button
            colorScheme="blue"
            onClick={onOpen}
            leftIcon={<MdOutlineLibraryAdd />}
          >
            Add Product
          </Button>
        </Flex>
        <Products workspaceId={workspace?.id} onEdit={onEdit} />
      </Stack>
      {isOpen && (
        <ProductForm
          isOpen
          onClose={handleClose}
          product={product}
          workspaceId={workspace?.id}
        />
      )}
    </>
  );
};

export default ProductPage;
