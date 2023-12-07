import {
  Td,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { IoMenu } from 'react-icons/io5';
import {
  MdOutlineEdit,
  MdReportGmailerrorred,
  MdOutlineDelete,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import backend from 'apis/backend';
import { Product } from 'types/Product';
import { useAuth } from 'hooks';

interface ProductListItem extends Product {
  onEdit(product: Product): void;
}

const ProductListItem = ({ onEdit, ...product }: ProductListItem) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return backend.delete(
        `/workspaces/${product.workspace.id}/products/${product.id}`,
        { headers: { ...token } }
      );
    },
    onSuccess: () => {
      if (product) {
        queryClient.removeQueries({ queryKey: ['products', product?.id] });
      }
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleEdit = () => {
    onEdit(product);
  };

  const handleDelete = () => {
    mutation.mutate();
  };

  const handleGotoReport = () => {
    navigate(`/w/${product.id}/reports`);
  };

  return (
    <>
      <Td>{product.id.split('-')[0].toUpperCase()}</Td>
      <Td>{product.name}</Td>
      <Td isNumeric>{product.quantityInStock}</Td>
      <Td isNumeric>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<IoMenu size={18} />}
            variant="outline"
            colorScheme="blue"
            size="sm"
          />
          <MenuList>
            <MenuItem icon={<MdOutlineEdit size={22} />} onClick={handleEdit}>
              Edit
            </MenuItem>
            <MenuItem
              icon={<MdReportGmailerrorred size={22} />}
              onClick={handleGotoReport}
            >
              Add Report
            </MenuItem>
            <MenuItem
              color="red.500"
              icon={<MdOutlineDelete size={22} />}
              onClick={handleDelete}
            >
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </>
  );
};

export default ProductListItem;
