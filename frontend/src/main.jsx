import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import { AppStoreProvider } from './app/store';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<AppStoreProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AppStoreProvider>
	</StrictMode>
);
