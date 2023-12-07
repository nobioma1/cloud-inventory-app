import { useQuery } from '@tanstack/react-query';

import backend from 'apis/backend';
import { useAuth } from 'hooks';

export const useWorkspace = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['workspaces'],
    queryFn: async () => {
      const token = await getToken();
      const response = await backend.get('/workspaces', {
        headers: { ...token },
      });
      return response.data;
    },
  });
};
