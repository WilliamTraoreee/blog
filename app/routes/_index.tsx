import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => {
	return [
		{ title: 'William Traoré' },
		{
			name: 'description',
			content:
				'Le meilleur blog qui existe actuellement sur cette planète (oui)',
		},
	];
};

export default function Index() {
	return <p>cool</p>;
}
