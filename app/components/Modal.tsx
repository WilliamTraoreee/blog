import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';

type Props = {
	trigger: React.ReactNode;
	children: React.ReactNode;
};

export function Modal(props: Props) {
	const { trigger, children } = props;

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed top-0 left-0 w-screen h-screen bg-dark-900/80 flex items-center justify-center'>
					<motion.div
						initial={{ y: 0, opacity: 0 }}
						animate={{ y: 10, opacity: 1 }}
						transition={{
							ease: 'easeInOut',
							duration: 0.2,
							stiffness: 100,
							damping: 10,
						}}
						className='w-[calc(100%_-_48px)] md:w-1/3 border border-dark-400 bg-dark-500 p-3 rounded-lg'
					>
						<Dialog.Content>{children}</Dialog.Content>
					</motion.div>
				</Dialog.Overlay>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
