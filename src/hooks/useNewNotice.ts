import { useRouter } from 'next/router';
import {
  type UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { createNotice } from '@/apis';
import { NewNotice } from '@/types';

export function useNewNotice(): UseMutationResult<
  unknown,
  AxiosError,
  NewNotice
> {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(createNotice, {
    onSuccess() {
      queryClient.invalidateQueries(['notices']);
      router.push('/notice');
    },
    onError(error) {
      console.log(error);
    },
  });
}