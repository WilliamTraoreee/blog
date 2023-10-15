import { cssBundleHref } from '@remix-run/css-bundle';
import { json, type LinksFunction } from '@remix-run/node';
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
} from '@remix-run/react';
import './index.css';

declare global {
	interface Window {
		ENV: {
			API_URL: string;
			POCKETBASE_URL: string;
		};
	}
}

export function getPublicEnv(key: 'API_URL' | 'POCKETBASE_URL') {
	return typeof window === 'undefined' ? process.env[key] : window.ENV[key];
}

export async function loader() {
	return json({
		ENV: {
			API_URL: process.env.API_URL,
			POCKETBASE_URL: process.env.POCKETBASE_URL,
		},
	});
}

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export default function App() {
	const data = useLoaderData<typeof loader>();

	return (
		<html lang='fr'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				<Outlet />
				<ScrollRestoration />
				<script
					dangerouslySetInnerHTML={{
						__html: `window.ENV = ${JSON.stringify(data.ENV)}`,
					}}
				/>
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
