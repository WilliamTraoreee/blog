type Props = {
	id: string;
};

export function Twitch(props: Props) {
	const { id } = props;

	return (
		<iframe
			src={`https://player.twitch.tv/?channel=${id}&parent=${window.location.hostname}`}
			frameBorder='0'
			allowFullScreen
			scrolling='no'
			height='378'
			width='620'
			className='w-full aspect-video mt-3 rounded-xl'
		></iframe>
	);
}
