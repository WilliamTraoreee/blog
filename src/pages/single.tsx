import { Post } from '../components/post';
import { New } from '../components/new';
import { Link, useParams } from 'react-router-dom';
import { usePost } from '../hooks/post/use-post';

export function Single() {
	const { id } = useParams();
	const { data, isLoading } = usePost(id!);

	if (isLoading)
		return <span className='text-center block w-full text-4xl'>🧑‍💻</span>;

	return (
		<>
			<a
				href='https://github.com/WilliamTraoreee/blog'
				target='_blank'
				className='absolute top-2 left-2 text-xl'
			>
				<i className='ri-github-fill'></i>
			</a>
			<main className='md:w-[640px] w-full px-6 mx-auto py-20'>
				<div className='flex justify-between gap-3 mb-5'>
					<Link
						to='/'
						className='w-10 flex items-center justify-center h-10 border border-white/20 bg-white/10 rounded hover:bg-white hover:text-black transition-colors duration-150'
					>
						<i className='ri-arrow-left-s-line'></i>
					</Link>
				</div>
				{data && <Post post={data} />}
			</main>
			<New />
		</>
	);
}
