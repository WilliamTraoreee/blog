import { type SubmitHandler, useForm } from 'react-hook-form';
import { Button } from './Button';
import { Input } from './Input';
import { Modal } from './Modal';
import { pb } from '~/utils/pb';

type Login = {
	email: string;
	password: string;
};

export function Login() {
	const { register, handleSubmit } = useForm<Login>();

	const login: SubmitHandler<Login> = async (data) => {
		pb.admins.authWithPassword(data.email, data.password);
	};

	return (
		<Modal
			trigger={
				<Button className='fixed bottom-2 right-2' variant='stroke'>
					Login
				</Button>
			}
		>
			<p className='text-lg font-medium mb-2'>Connexion</p>
			<form onSubmit={handleSubmit(login)}>
				<Input
					type='email'
					placeholder='Email'
					className='mb-2'
					{...register('email')}
				/>
				<Input
					type='password'
					placeholder='Mot de passe'
					className='mb-2'
					{...register('password')}
				/>
				<div className='flex justify-end'>
					<Button type='submit'>Connexion</Button>
				</div>
			</form>
		</Modal>
	);
}
