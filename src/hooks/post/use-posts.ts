import { useQuery } from '@tanstack/react-query';
import { postKeys } from '../query-keys';
import ky from 'ky';
import { PostCollectionSchema } from '../../types/post';

export const usePosts = () => {
	return useQuery({
		queryKey: postKeys.lists(),
		queryFn: async () => {
			const data = await ky
				.get(
					`${
						import.meta.env.VITE_API_URL
					}/collections/posts/records?sort=-created`
				)
				.json();

			return PostCollectionSchema.parse(data);
		},
		staleTime: Infinity,
	});
};
