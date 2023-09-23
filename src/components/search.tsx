import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

export function Search() {
	const { handleSubmit, register } = useForm<{ query: string }>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<{ query: string }> = (query) => {
		navigate(`/search?q=${query.query}`);
	};

	return (
		<form
			className='w-full flex justify-end relative'
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				type='text'
				className='w-full md:w-1/3 block h-10 bg-white/10 rounded border border-white/20 outline-none pl-2 pr-9'
				{...register('query')}
			/>
			<button className='absolute right-1 top-1 h-8 w-8 text-white'>
				<i className='ri-search-line'></i>
			</button>
		</form>
	);
}
