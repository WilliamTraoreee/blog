import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePost, PostSchema } from '../../types/post';
import { pb } from '../../main';
import { postKeys } from '../query-keys';

export function useCreatePost() {
	const queryClient = useQueryClient();

	return useMutation(
		async (post: CreatePost) => {
			const formData = new FormData();

			formData.append('content', post.content);
			if (post.imageFile) {
				formData.append('image', post.imageFile as File);
			}

			const data = await pb.collection('posts').create(formData);

			return PostSchema.parse(data);
		},
		{
			onSuccess: () => {
				void queryClient.invalidateQueries(postKeys.lists());
			},
		}
	);
}
