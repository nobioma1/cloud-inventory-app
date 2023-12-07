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
  Text,
  Select,
  FormLabel,
  FormControl,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import TextAreaInput from 'components/TextareaInput';
import backend from 'apis/backend';
import { useAuth } from 'hooks';
import { Product } from 'types/Product';

interface ProductReportFormProps {
  isOpen: boolean;
  product: Product;
  onClose(): void;
}

interface FormValues {
  report: string;
  severity: string;
}

const productSchema = Yup.object().shape({
  report: Yup.string()
    .min(2, 'Report should be more than 2 characters')
    .required('Report is required'),
  severity: Yup.string()
    .oneOf(['Minor', 'Moderate', 'Major', 'Critical'])
    .required(),
});

const ProductReportForm = ({
  isOpen,
  onClose,
  product,
}: ProductReportFormProps) => {
  const { getToken } = useAuth();
  const firstField = useRef(null);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const token = await getToken();
      const response = await backend.post(
        `/workspaces/${product?.workspace.id}/products/${product.id}/reports`,
        values,
        { headers: { ...token } }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [product.id, 'reports'] });
      onClose();
    },
  });

  const { handleSubmit, handleChange, handleBlur, values, ...formik } =
    useFormik({
      initialValues: {
        report: '',
        severity: 'Minor',
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
          <DrawerHeader borderBottomWidth="1px">
            Add New Product Report
          </DrawerHeader>
          <DrawerBody>
            <Text marginBottom={5} fontSize="sm" color="gray.600">
              Product Identifier:{' '}
              <Text as="span" fontWeight="bold">
                {product?.id.split('-')[0].toUpperCase()}
              </Text>
            </Text>
            <Stack spacing={6}>
              <TextAreaInput
                label="Detail of issue with product"
                rows={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.report}
                name="report"
                errorText={
                  formik.touched.report && formik.errors.report
                    ? formik.errors.report
                    : ''
                }
              />

              <FormControl>
                <FormLabel>Issue Severity</FormLabel>
                <Select
                  name="severity"
                  value={values.severity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="Minor">Minor</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Major">Major</option>
                  <option value="Critical">Critical</option>
                </Select>
              </FormControl>
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
              Add Product Report
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </form>
    </Drawer>
  );
};

export default ProductReportForm;
