import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { pb } from '../main';
import { useDeletePost } from '../hooks/post/use-delete-post';

type Props = {
	id: string;
};

export function Delete(props: Props) {
	const { id } = props;
	const [open, setOpen] = useState<boolean>(false);

	const { mutate, isSuccess } = useDeletePost();

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
		}
	}, [isSuccess]);

	if (!pb.authStore.isValid) {
		return null;
	}

	return (
		<>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<Dialog.Trigger asChild>
					<button>
						<i className='ri-close-circle-fill'></i>
					</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className='w-screen h-screen bg-black/80 backdrop-blur fixed top-0 left-0' />
					<Dialog.Content className='fixed top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 w-[400px] outline-none border border-post-border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg p-5'>
						<h5 className='text-xl mb-3'>
							Êtes-vous sûr de vouloir supprimer ce post ?
						</h5>
						<div className='flex justify-end gap-2'>
							<button
								className='h-10 rounded px-2.5 text-sm inline-flex items-center'
								onClick={() => setOpen(false)}
							>
								Annuler
							</button>
							<button
								className='bg-white text-black h-10 rounded px-2.5 text-sm inline-flex items-center'
								onClick={() => mutate(id)}
							>
								Supprimer
							</button>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
