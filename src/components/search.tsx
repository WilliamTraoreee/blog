import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type Props = {
	value?: string;
};

export function Search(props: Props) {
	const { value } = props;

	const { handleSubmit, register } = useForm<{ query: string }>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<{ query: string }> = (query) => {
		navigate(`/search?q=${query.query}`);
	};

	return (
		<form
			className='flex justify-end relative'
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				defaultValue={value}
				type='text'
				className='w-64 shrink-0 block h-10 bg-white/10 rounded border border-white/20 outline-none pl-2 pr-9 focus:border-white'
				{...register('query')}
			/>
			<button className='absolute right-1 top-1 h-8 w-8 text-white'>
				<i className='ri-search-line'></i>
			</button>
		</form>
	);
}
