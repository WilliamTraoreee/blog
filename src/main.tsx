import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './pages/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'remixicon/fonts/remixicon.css';
import PocketBase from 'pocketbase';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth } from './components/auth';
import { SearchPage } from './pages/search';
import { SearchDatePage } from './pages/search-date';
import { Single } from './pages/single';

const router = createBrowserRouter([
	{ path: '/', element: <Home /> },
	{ path: '/login', element: <Auth /> },
	{ path: '/search', element: <SearchPage /> },
	{ path: '/search-date', element: <SearchDatePage /> },
	{ path: '/post/:id', element: <Single /> },
]);

const queryClient = new QueryClient();
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
);
