import { useEffect, useState } from 'react';
import { Post } from '../components/post';
import { usePosts } from '../hooks/post/use-posts';
import { Post as PostType } from '../types/post';

export function Home() {
	const [currentPage, setCurrentPage] = useState(1);
	const [posts, setPosts] = useState<PostType[]>([]);
	const { data, isSuccess } = usePosts(1, currentPage);

	useEffect(() => {
		if (isSuccess) {
			const newPosts = [...posts, ...data.items] as PostType[];
			setPosts(newPosts);
		}
	}, [isSuccess]);

	useEffect(() => {
		window.onscroll = function () {
			if (
				window.innerHeight + window.pageYOffset >=
				document.body.offsetHeight
			) {
				if (!data) return;
				if (currentPage >= data?.totalPages) return;
				setCurrentPage((current) => current + 1);
			}
		};
	}, [currentPage, data]);

	return (
		<>
			<main className='md:w-[640px] w-full px-6 mx-auto py-20'>
				{posts?.length === 0 && (
					<span className='text-center block w-full text-4xl'>🧑‍💻</span>
				)}
				{posts.length !== 0 &&
					posts.map((post) => <Post post={post} key={post.id} />)}
			</main>
			<div className='h-[3000px] w-full bg-red-500'></div>
		</>
	);
}
