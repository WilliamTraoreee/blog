import { Post } from '../components/post';
import { usePosts } from '../hooks/post/use-posts';

export function Home() {
	const { data } = usePosts();

	return (
		<>
			<main className='md:w-[640px] w-full px-6 mx-auto py-20'>
				{!data ||
					(data?.items.length === 0 && (
						<span className='text-center block w-full text-4xl'>🧑‍💻</span>
					))}
				{data && data.items.map((post) => <Post post={post} key={post.id} />)}
			</main>
		</>
	);
}
