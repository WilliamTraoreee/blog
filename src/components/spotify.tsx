type Props = {
	id: string;
};

export function Spotify(props: Props) {
	const { id } = props;

	return (
		<iframe
			className='rounded-lg mt-3'
			src={`https://open.spotify.com/embed/track/${id}`}
			width='100%'
			height='152'
			frameBorder='0'
			allowFullScreen
			allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
			loading='lazy'
		></iframe>
	);
}
