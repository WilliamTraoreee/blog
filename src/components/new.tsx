import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreatePost } from '../types/post';
import { useCreatePost } from '../hooks/post/use-create-post';
import { pb } from '../main';

export function New() {
	const [open, setOpen] = useState<boolean>(false);
	const [image, setImage] = useState<string | null>(null);

	const { handleSubmit, register, reset, setValue } = useForm<CreatePost>();
	const { mutate, isSuccess } = useCreatePost();

	const handleImageChoose = (image: File) => {
		const data = URL.createObjectURL(image);
		setImage(data);
		setValue('imageFile', image);
	};

	const onSubmit: SubmitHandler<CreatePost> = (post) => {
		mutate(post);
	};

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
			setImage(null);
			reset();
		}
	}, [isSuccess, reset]);

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((open) => !open);
			}
		};

		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, []);

	useEffect(() => {
		const down = async (e: KeyboardEvent) => {
			if (open && !image) {
				if (e.key === 'v' && (e.metaKey || e.ctrlKey)) {
					const clipboard = await navigator.clipboard.read();
					const imageBlob = await clipboard[0].getType('image/png');
					const data = URL.createObjectURL(imageBlob);
					setImage(data);
					setValue(
						'imageFile',
						new File([imageBlob], 'image.png', { type: 'image/png' })
					);
				}
			}
		};
		document.addEventListener('keydown', down);
		return () => document.removeEventListener('keydown', down);
	}, [open, setValue, image]);

	if (!pb.authStore.isValid) {
		return null;
	}

	return (
		<>
			<Dialog.Root
				open={open}
				onOpenChange={(o) => {
					setOpen(o);
					reset();
					setImage(null);
				}}
			>
				<Dialog.Trigger asChild>
					<button className='fixed bottom-4 left-4 inline-flex h-14 border border-white/10 bg-white/5 items-center rounded-full px-5 gap-2 hover:bg-white hover:text-black transition-colors duration-200 outline-none'>
						<i className='ri-pencil-line'></i>
						<span className='text-sm'>Nouveau</span>
					</button>
				</Dialog.Trigger>

				<Dialog.Portal>
					<Dialog.Overlay className='w-screen h-screen bg-black/80 backdrop-blur fixed top-0 left-0' />
					<Dialog.Content className='fixed top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2 w-[400px] outline-none'>
						<form
							className='w-full !translate-x-0 !-translate-y-40'
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className='w-full border border-post-border rounded-lg bg-white/10 backdrop-blur-lg shadow-lg mb-2'>
								<textarea
									placeholder='Contenu du post'
									className='bg-transparent w-full h-52 p-4 outline-none resize-none'
									{...register('content')}
								></textarea>
							</div>

							{!image && (
								<label htmlFor='image_file'>
									<div className='w-10 h-10 flex items-center bg-white/5 rounded justify-center'>
										<i className='ri-image-line'></i>
									</div>
									<input
										type='file'
										id='image_file'
										className='hidden'
										accept='.png,.jpg,.jpeg,.svg,.webp'
										onChange={(e) =>
											e.target.files && handleImageChoose(e.target.files[0])
										}
									/>
								</label>
							)}

							{image && (
								<img src={image} className='w-full h-auto rounded-lg mb-3' />
							)}

							<div className='flex justify-end'>
								<button
									className='bg-white text-black h-10 rounded px-2.5 text-sm inline-flex items-center'
									type='submit'
								>
									Poster
								</button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
