import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { pb } from '../main';

type UserInput = {
	mail: string;
	password: string;
};

export function Auth() {
	const [open, setOpen] = useState<boolean>(false);

	const { handleSubmit, register } = useForm<UserInput>();

	const onSubmit: SubmitHandler<UserInput> = async (user) => {
		const authData = await pb.admins.authWithPassword(user.mail, user.password);
		if (authData) {
			setOpen(false);
			window.location.reload();
		}
	};

	if (pb.authStore.isValid) {
		return (
			<button
				className='fixed bottom-4 right-4 inline-flex h-14 border border-white/10 bg-white/5 items-center rounded-full px-5 gap-2 hover:bg-white hover:text-black transition-colors duration-200 outline-none'
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
		<>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger asChild>
					<button className='fixed bottom-4 right-4 inline-flex h-14 border border-white/10 bg-white/5 items-center rounded-full px-5 gap-2 hover:bg-white hover:text-black transition-colors duration-200 outline-none'>
						<i className='ri-pencil-line'></i>
						<span className='text-sm'>Admin</span>
					</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className='w-screen h-screen bg-black/80 backdrop-blur fixed top-0 left-0' />
					<Dialog.Content className='fixed top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 w-[400px] outline-none'>
						<form
							className='w-full !translate-x-0 !-translate-y-40'
							onSubmit={handleSubmit(onSubmit)}
						>
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
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
