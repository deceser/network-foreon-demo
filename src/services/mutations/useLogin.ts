import { useMutation } from '@tanstack/react-query';

import { setAccessToken, setRefreshToken, tryLogin } from '@/services/auth';

const useLogin = () => {
  return useMutation({
    mutationFn: tryLogin,
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
    },
  });
};

export default useLogin;
