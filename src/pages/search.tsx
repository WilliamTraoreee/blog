import { Fragment, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSearchPosts } from '../hooks/post/use-search-posts';
import { useInView } from 'react-intersection-observer';
import { Search } from '../components/search';
import { New } from '../components/new';
import { Post } from '../components/post';
import { BackToTop } from '../components/back-to-top';

export function SearchPage() {
	const [searchParams] = useSearchParams();
	const { inView, ref } = useInView();

	const query = searchParams.get('q');
	const { data, fetchNextPage } = useSearchPosts(query!);

	useEffect(() => {
		if (inView) {
			fetchNextPage();
		}
	}, [inView]);

	useEffect(() => {}, []);

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
				<div className='flex justify-end mb-5'>
					<Link
						to='/'
						className='w-10 flex items-center justify-center h-10 border border-white/20 bg-white/10 rounded hover:bg-white hover:text-black transition-colors duration-150'
					>
						<i className='ri-arrow-left-s-line'></i>
					</Link>
					<Search />
				</div>
				{!data ||
					(data?.pages[0].totalItems === 0 && (
						<span className='text-center block w-full text-4xl'>🧑‍💻</span>
					))}
				{data &&
					data.pages.map((page) => (
						<Fragment key={Math.random()}>
							{page.items.map((post) => (
								<Post post={post} key={post.id} />
							))}
						</Fragment>
					))}
			</main>
			{data &&
				data.pages[data?.pages.length - 1].page !==
					data.pages[data?.pages.length - 1].totalPages &&
				data?.pages[0].totalItems !== 0 && (
					<div className='w-full flex justify-center'>
						<button
							ref={ref}
							onClick={() => fetchNextPage()}
							className='bg-white text-black h-10 rounded px-2.5 text-sm inline-flex items-center'
						>
							Plus de post
						</button>
					</div>
				)}
			<New />
			<BackToTop />
		</>
	);
}
