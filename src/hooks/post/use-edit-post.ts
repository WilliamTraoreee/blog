import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditPost, PostSchema } from '../../types/post';
import { postKeys } from '../query-keys';
import { pb } from '../../main';

export function useEditPost() {
	const queryClient = useQueryClient();

	return useMutation(
		async (post: EditPost) => {
			const data = await pb
				.collection('posts')
				.update(post.id, { content: post.content });

			return PostSchema.parse(data);
		},
		{
			onSuccess: () => {
				void queryClient.invalidateQueries(postKeys.lists());
			},
		}
	);
}
