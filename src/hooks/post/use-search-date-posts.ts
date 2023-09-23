import { PostCollection } from './../../types/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import ky from 'ky';
import { postKeys } from '../query-keys';

export const useSearchDatePosts = (from: string, to: string) => {
	return useInfiniteQuery({
		queryKey: postKeys.search(`${from}-${to}`),
		queryFn: async ({ pageParam = 1 }) => {
			const data = await ky
				.get(
					`${
						import.meta.env.VITE_API_URL
					}/collections/posts/records?sort=-created&page=${pageParam}&perPage=30&filter=(created>'${from}' %26%26 created<'${to}')`
				)
				.json();

			return data as PostCollection;
		},
		getNextPageParam: (lastPage) => {
			if (lastPage.page < lastPage.totalPages) {
				return lastPage.page + 1;
			}
		},
		getPreviousPageParam: (firstPage) => {
			if (firstPage.page > 1) {
				return firstPage.page - 1;
			}
		},
	});
};
