import { SubmitHandler, useForm } from 'react-hook-form';
import { pb } from '../main';
import { useNavigate } from 'react-router-dom';

type UserInput = {
	mail: string;
	password: string;
};

export function Auth() {
	const { handleSubmit, register } = useForm<UserInput>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<UserInput> = async (user) => {
		try {
			const authData = await pb.admins.authWithPassword(
				user.mail,
				user.password
			);
			if (authData) {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	if (pb.authStore.isValid) {
		return (
			<button
				className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex h-14 border border-white/10 bg-white/5 items-center rounded-full px-5 gap-2 hover:bg-white hover:text-black transition-colors duration-200 outline-none'
				onClick={() => {
					pb.authStore.clear();
					window.location.reload();
				}}
			>
				<i className='ri-pencil-line'></i>
				<span className='text-sm'>Déconnexion</span>
			</button>
		);
	}

	return (
		<div className='flex items-center justify-center w-screen h-screen'>
			<form className='w-80' onSubmit={handleSubmit(onSubmit)}>
				<div className='w-full bg-grey-700 border border-post-border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg mb-2'>
					<input
						placeholder='Mail'
						type='email'
						className='bg-transparent w-full h-10 p-3 outline-none resize-none'
						{...register('mail')}
					/>
				</div>

				<div className='w-full bg-grey-700 border border-post-border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg mb-2'>
					<input
						placeholder='Mot de passe'
						type='password'
						className='bg-transparent w-full h-10 p-3 outline-none resize-none'
						{...register('password')}
					/>
				</div>

				<div className='flex justify-end'>
					<button
						className='bg-white text-black h-10 rounded px-2.5 text-sm inline-flex items-center'
						type='submit'
					>
						Se connecter
					</button>
				</div>
			</form>
		</div>
	);
}
