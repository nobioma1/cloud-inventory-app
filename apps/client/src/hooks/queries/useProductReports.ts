import { useQuery } from '@tanstack/react-query';

import backend from 'apis/backend';
import { useAuth } from 'hooks';
import { ProductReport } from 'types/Product';

export const useProductReports = (workspaceId: string, productId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: [productId, 'reports'],
    enabled: Boolean(workspaceId) && Boolean(productId),
    queryFn: async () => {
      const token = await getToken();
      const response = await backend.get<ProductReport[]>(
        `/workspaces/${workspaceId}/products/${productId}/reports`,
        { headers: { ...token } }
      );
      return response.data;
    },
  });
};
