/* eslint-disable react/display-name */
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, LegacyRef } from 'react';

export const Input = forwardRef(
	(props: ComponentPropsWithoutRef<'input'>, ref) => {
		const { ...rest } = props;

		return (
			<input
				{...rest}
				className={`block h-10 px-2 border border-dark-400 rounded bg-dark-600 w-full text-sm outline-none focus-visible:border-dark-100 transition-colors duration-200 ${rest.className}`}
				ref={ref as LegacyRef<HTMLInputElement>}
			/>
		);
	}
);
