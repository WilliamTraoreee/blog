import * as TooltipPrimitive from '@radix-ui/react-tooltip';

type Props = {
	content: string;
	children: React.ReactNode;
};

export function Tooltip(props: Props) {
	const { content, children } = props;

	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content className='py-1 px-2 bg-black rounded text-xs'>
						{content}
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
