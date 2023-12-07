import { useQuery } from '@tanstack/react-query';

import backend from 'apis/backend';
import { useAuth } from 'hooks';

export const useUser = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const token = await getToken();
      const response = await backend.get('/users', { headers: { ...token } });
      return response.data;
    },
  });
};
