import { useEffect, useState } from 'react';

export function BackToTop() {
	const [display, setDisplay] = useState<boolean>(true);

	const handleScrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setDisplay(scrollTop > 0);
		};

		handleScroll();

		document.addEventListener('scroll', handleScroll);

		return () => document.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<>
			{display && (
				<button
					onClick={handleScrollToTop}
					className='fixed bottom-4 right-4 inline-flex h-14 w-14 justify-center border border-white/10 bg-white/5 items-center rounded-full gap-2 hover:bg-white hover:text-black transition-colors duration-200 outline-none'
				>
					<i className='ri-arrow-up-s-line'></i>
				</button>
			)}
		</>
	);
}
