import { useQuery } from '@tanstack/react-query';

import backend from 'apis/backend';
import { useAuth } from 'hooks';
import { Product } from 'types/Product';

export const useProducts = (workspaceId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['products'],
    enabled: Boolean(workspaceId),
    queryFn: async () => {
      const token = await getToken();
      const response = await backend.get<Product[]>(
        `/workspaces/${workspaceId}/products`,
        { headers: { ...token } }
      );
      return response.data;
    },
  });
};
