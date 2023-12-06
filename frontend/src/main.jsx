import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import GlobalProvider from './state/context/GlobalContext/Context';
import { ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {HelmetProvider,} from 'react-helmet-async';
import {ToastContainer,} from 'react-toastify';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
	<GlobalProvider>
		<HelmetProvider>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<App/>
				<ToastContainer/>	
			</ThemeProvider>
		</HelmetProvider>
	</GlobalProvider>
);
