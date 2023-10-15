/* eslint-disable react/display-name */
import { Link } from '@remix-run/react';
import type { LegacyRef, ComponentPropsWithoutRef } from 'react';
import { forwardRef } from 'react';

type Props = {
	variant?: 'primary' | 'stroke' | 'dark' | 'transparent';
	size?: 'small' | 'medium';
	link?: {
		href: string;
		external?: boolean;
	};
	children: React.ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export const Button = forwardRef((props: Props, ref) => {
	const {
		variant = 'primary',
		size = 'medium',
		link,
		children,
		...rest
	} = props;

	const colorClasses = {
		primary: 'bg-white text-black hover:opacity-80',
		stroke: 'bg-dark-800 border border-dark-400 hover:bg-dark-700',
		dark: 'bg-dark-800 hover:bg-dark-700',
		transparent: 'bg-transparent text-white',
	};

	const sizeClasses = {
		small: 'h-5 px-1 text-xs',
		medium: 'h-10 px-2 text-sm',
	};

	const defineClassName = `rounded transition-all duration-200 outline-none ${colorClasses[variant]} ${sizeClasses[size]} ${rest?.className}`;

	if (link && !link?.external) {
		return (
			<Link to={link.href} className={defineClassName}>
				{children}
			</Link>
		);
	}

	if (link && link?.external) {
		<a href={link.href} target='_blank' rel='noreferrer'>
			{children}
		</a>;
	}

	return (
		<button
			{...rest}
			className={defineClassName}
			ref={ref as LegacyRef<HTMLButtonElement>}
		>
			{children}
		</button>
	);
});
