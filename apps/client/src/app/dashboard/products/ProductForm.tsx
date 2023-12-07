import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  DrawerFooter,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import TextInput from 'components/TextInput';
import TextAreaInput from 'components/TextareaInput';
import backend from 'apis/backend';
import { useAuth } from 'hooks';
import { Product } from 'types/Product';

interface ProductFormProps {
  isOpen: boolean;
  product: Product | null;
  workspaceId: string;
  onClose(): void;
}

interface FormValues {
  name: string;
  description: string;
  quantityInStock: number;
}

const productSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Product name should be more than 2 characters')
    .max(50, 'Product name should be less than or equal to 50 characters')
    .required('Product name is required'),
  description: Yup.string().max(
    250,
    'Description should be less than or equal to 250 characters.'
  ),
  quantityInStock: Yup.number().integer().required('Quantity is not valid'),
});

const ProductForm = ({
  isOpen,
  onClose,
  product,
  workspaceId,
}: ProductFormProps) => {
  const firstField = useRef(null);
  const { getToken } = useAuth();

  const queryClient = useQueryClient();

  const isEdit = Boolean(product);
  const formHeader = `${isEdit ? 'Edit' : 'Add a New'} Product`;

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const token = await getToken();
      const response = await backend[isEdit ? 'patch' : 'post'](
        `/workspaces/${workspaceId}/products/${product ? product.id : ''}`,
        values,
        { headers: { ...token } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, ...formik } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        name: product?.name ?? '',
        description: product?.description ?? '',
        quantityInStock: product?.quantityInStock ?? 0,
      },
      validationSchema: productSchema,
      onSubmit: async (values) => {
        await mutation.mutateAsync(values);
      },
    });

  return (
    <Drawer
      size="md"
      isOpen={isOpen}
      placement="right"
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <form onSubmit={handleSubmit}>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">{formHeader}</DrawerHeader>
          <DrawerBody>
            <Stack spacing={6}>
              <TextInput
                label="Product Name"
                ref={firstField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                name="name"
                errorText={
                  formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ''
                }
              />
              <TextAreaInput
                label="Product Description"
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                name="description"
                errorText={
                  formik.touched.description && formik.errors.description
                    ? formik.errors.description
                    : ''
                }
              />
              <TextInput
                type="number"
                label="Quantity in stock"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.quantityInStock}
                name="quantityInStock"
                errorText={
                  formik.touched.quantityInStock &&
                  formik.errors.quantityInStock
                    ? formik.errors.quantityInStock
                    : ''
                }
              />
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={formik.isSubmitting}
              isDisabled={!(formik.isValid && formik.dirty)}
            >
              {isEdit ? 'Update Product Details' : 'Save to Inventory'}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default ProductForm;
