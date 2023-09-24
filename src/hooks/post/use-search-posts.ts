import { PostCollection } from './../../types/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import ky from 'ky';
import { postKeys } from '../query-keys';

export const useSearchPosts = (query: string) => {
	return useInfiniteQuery({
		queryKey: postKeys.search(query),
		queryFn: async ({ pageParam = 1 }) => {
			const getQuery = () => {
				if (query.includes("'")) {
					return `"${query}"`;
				} else {
					return `'${query}'`;
				}
			};
			const data = await ky
				.get(
					`${
						import.meta.env.VITE_API_URL
					}/collections/posts/records?sort=-created&page=${pageParam}&perPage=30&filter=content~${getQuery()}`
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
