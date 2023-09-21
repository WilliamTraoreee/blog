import { useMutation, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { postKeys } from '../query-keys';
import { pb } from '../../main';

export function useDeletePost() {
	const queryClient = useQueryClient();

	return useMutation(
		async (id: string) => {
			await ky.delete(
				`${import.meta.env.VITE_API_URL}/collections/posts/records/${id}`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${pb.authStore.token}`,
					},
				}
			);
		},
		{
			onSuccess: (_, id) => {
				void queryClient.invalidateQueries(postKeys.lists());
				void queryClient.removeQueries(postKeys.detail(id));
			},
		}
	);
}
