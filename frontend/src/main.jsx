import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import GlobalProvider from './state/context/GlobalContext/Context';
import './index.css';
import { StyledEngineProvider } from '@mui/material/styles';

import {HelmetProvider,} from 'react-helmet-async';
import {ToastContainer,} from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
	<GlobalProvider>
		<HelmetProvider>
			<StyledEngineProvider injectFirst>
				<App/>
				<ToastContainer/>	
			</StyledEngineProvider>
		</HelmetProvider>
	</GlobalProvider>
);
