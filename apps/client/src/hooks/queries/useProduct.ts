import { useQuery } from '@tanstack/react-query';

import backend from 'apis/backend';
import { useAuth } from 'hooks';
import { Product } from 'types/Product';

export const useProduct = (productId: string, workspaceId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['products', productId],
    enabled: Boolean(productId) && Boolean(workspaceId),
    queryFn: async () => {
      const token = await getToken();
      const response = await backend.get<Product>(
        `/workspaces/${workspaceId}/products/${productId}`,
        { headers: { ...token } }
      );
      return response.data;
    },
  });
};
