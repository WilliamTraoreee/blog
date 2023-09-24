import { Post } from './../../types/post';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { postKeys } from '../query-keys';

export const usePost = (id: string) => {
	return useQuery({
		queryKey: postKeys.detail(id),
		queryFn: async () => {
			const data = await ky
				.get(`${import.meta.env.VITE_API_URL}/collections/posts/records/${id}`)
				.json();

			return data as Post;
		},
	});
};
