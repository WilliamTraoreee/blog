type Props = {
	url: string;
};

export function Image(props: Props) {
	const { url } = props;

	return <img src={url} className='w-full mt-3 rounded-xl' />;
}
