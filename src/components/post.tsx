import { pb } from '../main';
import { Post as PostType } from '../types/post';
import { dateToHumanReadable } from '../utils/format-date';
import { parsePostContent } from '../utils/parse-post-content';
import { Delete } from './delete';
import { Spotify } from './spotify';
import { Twitch } from './twitch';
import { Youtube } from './youtube';
import { Image } from './image';
import { Edit } from './edit';

type Props = {
	post: PostType;
};

export function Post(props: Props) {
	const { post } = props;

	const postContent = parsePostContent(post.content);

	return (
		<div className='bg-post-bg border border-post-border p-4 rounded-lg mb-1'>
			<div className='flex justify-between items-center'>
				<span className='bg-white text-black text-xs px-2 py-1 rounded-full'>
					{dateToHumanReadable(post.created)}
				</span>
				{pb.authStore.isValid && (
					<div className='flex gap-2'>
						<Edit post={post} />
						<Delete id={post.id} />
					</div>
				)}
			</div>
			<div
				className='mt-3 text-xl post break-words'
				dangerouslySetInnerHTML={{
					__html: postContent.text,
				}}
			></div>
			{postContent.spotifyId && <Spotify id={postContent.spotifyId} />}
			{postContent.youtubeId && <Youtube id={postContent.youtubeId} />}
			{postContent.twitchId && <Twitch id={postContent.twitchId} />}
			{post.image && (
				<Image
					url={`${import.meta.env.VITE_API_URL}/files/posts/${post.id}/${
						post.image
					}`}
				/>
			)}
		</div>
	);
}
