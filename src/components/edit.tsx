import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreatePost, EditPost, Post } from '../types/post';
import { pb } from '../main';
import { useEditPost } from '../hooks/post/use-edit-post';

type Props = {
	post: Post;
};

export function Edit(props: Props) {
	const { post } = props;

	const [open, setOpen] = useState<boolean>(false);
	const [image, setImage] = useState<string | null>(
		post.image
			? `${import.meta.env.VITE_API_URL}/files/posts/${post.id}/${post.image}`
			: null
	);

	const { handleSubmit, register, reset, setValue } = useForm<EditPost>();
	const { mutate, isSuccess } = useEditPost();

	const handleImageChoose = (image: File) => {
		const data = URL.createObjectURL(image);
		setImage(data);
		setValue('imageFile', image);
	};

	const onSubmit: SubmitHandler<CreatePost> = (p) => {
		mutate({ content: p.content, id: post.id } as EditPost);
	};

	useEffect(() => {
		if (isSuccess) {
			setOpen(false);
		}
	}, [isSuccess, reset]);

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

	useEffect(() => {
		if (post.image) {
			setImage(
				`${import.meta.env.VITE_API_URL}/files/posts/${post.id}/${post.image}`
			);
		}
	}, [post]);

	if (!pb.authStore.isValid) {
		return null;
	}

	return (
		<>
			<Dialog.Root
				open={open}
				onOpenChange={(o) => {
					setOpen(o);
				}}
			>
				<Dialog.Trigger asChild>
					<button>
						<i className='ri-edit-2-line'></i>
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
									defaultValue={post.content}
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
									Modifier
								</button>
							</div>
						</form>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
