import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Home } from './pages/home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'remixicon/fonts/remixicon.css';
import { New } from './components/new';
import PocketBase from 'pocketbase';
import { Auth } from './components/auth';

const queryClient = new QueryClient();
export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Home />
			<New />
			<Auth />
		</QueryClientProvider>
	</React.StrictMode>
);
