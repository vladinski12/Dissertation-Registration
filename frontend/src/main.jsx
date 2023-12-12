import './index.css';
import App from './App.jsx';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalProvider from './state/context/GlobalContext/Context';
import {HelmetProvider,} from 'react-helmet-async';
import ReactDOM from 'react-dom/client';
import { ThemeProvider} from '@mui/material/styles';
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
