import { z } from 'zod';

export const PostContentSchema = z.object({
	text: z.string(),
	spotifyId: z.string().optional(),
	youtubeId: z.string().optional(),
	twitchId: z.string().optional(),
});

export const PostSchema = z.object({
	collectionId: z.string(),
	collectionName: z.string(),
	content: z.string(),
	created: z.string(),
	id: z.string(),
	updated: z.string(),
	image: z.string().optional().nullable(),
});

export const PostCollectionSchema = z.object({
	page: z.number(),
	perPage: z.number(),
	totalItems: z.number(),
	totalPages: z.number(),
	items: z.array(PostSchema),
});

export type Post = z.infer<typeof PostSchema>;
export type PostContent = z.infer<typeof PostContentSchema>;
export type PostCollection = z.infer<typeof PostCollectionSchema>;
export type CreatePost = Omit<
	Post,
	'id' | 'created' | 'updated' | 'collectionId' | 'collectionName | image'
> & { imageFile: File | null | undefined };
export type EditPost = Omit<
	Post,
	'created' | 'updated' | 'collectionId' | 'collectionName | image'
> & { imageFile: File | null | undefined };
