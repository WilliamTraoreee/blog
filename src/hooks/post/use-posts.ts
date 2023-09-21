import { useQuery } from '@tanstack/react-query';
import ky from 'ky';
import { PostCollectionSchema } from '../../types/post';

export const usePosts = (perPage: number, page: number) => {
	return useQuery({
		queryKey: ['posts', page],
		queryFn: async () => {
			const data = await ky
				.get(
					`${
						import.meta.env.VITE_API_URL
					}/collections/posts/records?sort=-created&page=${page}&perPage=${perPage}`
				)
				.json();

			return PostCollectionSchema.parse(data);
		},
		staleTime: Infinity,
	});
};
