import type { MetaFunction } from '@remix-run/node';
import { Modal } from '~/components/Modal';

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
	return (
		<div>
			<Modal trigger={<p>test</p>}>content</Modal>
		</div>
	);
}
