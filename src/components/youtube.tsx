type Props = {
	id: string;
};

export function Youtube(props: Props) {
	const { id } = props;

	return (
		<iframe
			width='560'
			height='315'
			src={`https://www.youtube.com/embed/${id}`}
			title='YouTube video player'
			frameBorder='0'
			allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
			allowFullScreen
			className='w-full aspect-video mt-3 rounded-xl'
		></iframe>
	);
}
