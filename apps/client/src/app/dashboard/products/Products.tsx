import {
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { useProducts } from 'hooks';
import LoadingList from 'components/LoadingList';
import ProductListItem from './ProductListItem';
import { Product } from 'types/Product';

interface ProductsProps {
  workspaceId: string;
  onEdit(product: Product): void;
}

const Products = ({ workspaceId, onEdit }: ProductsProps) => {
  const { isLoading, data: products = [] } = useProducts(workspaceId);

  if (isLoading) {
    return <LoadingList />;
  }

  if (!isLoading && products?.length === 0) {
    return (
      <Text textAlign="center" pt={6}>
        No projects added yet
      </Text>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Product Identifier</Th>
            <Th>Product Name</Th>
            <Th isNumeric>Quantity in Stock</Th>
            <Th isNumeric>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product.id}>
              <ProductListItem {...product} onEdit={onEdit} />
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default Products;
