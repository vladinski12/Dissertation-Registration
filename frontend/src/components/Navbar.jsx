import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import { Link,useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import BookIcon from '@mui/icons-material/Book';
import { Context } from '../state/context/GlobalContext/Context';
import MenuIcon from '@mui/icons-material/Menu';
import routes from '../app/routesConfig';
import { stringAvatar } from '../utils/constants';
import useAuth from '../state/hooks/useAuth';
import { useTheme } from '@mui/material/styles';

export default function Navbar(){
	const theme = useTheme();

	const locationPath = useLocation().pathname;

	const {
		context: { role,name },
	} = useContext(Context);

	const { logout } = useAuth();

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleLogout = () => {
		handleCloseUserMenu();
		logout();
	};

	const renderMenuItems = () => {
		return routes
			.filter((route) => route.title && route.roles?.includes(role))
			.map((route) => (
				<Link
					to={route.path}
					key={route.title}
					style={{ textDecoration: 'none',color: 'black' }}
				>
					<MenuItem
						selected={locationPath === route.path}
						onClick={handleCloseNavMenu}
					>
						{route.title}
					</MenuItem>
				</Link>
			));
	};

	const renderButtonItems = () => {
		return routes
			.filter((route) => route.title && route.roles?.includes(role))
			.map((route) => (
				<Link
					to={route.path}
					key={route.title}
					style={{ textDecoration: 'none' }}>
					<Button
						onClick={handleCloseNavMenu}
						sx={{
							my: 2,
							color: route.path === locationPath ? theme.palette.textColor.selected : theme.palette.textColor.main,
							display: 'block'
						}}
					>
						{route.title}
					</Button>
				</Link>
			));
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						DISSERTATION
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon/>
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{renderMenuItems()}
						</Menu>
					</Box>
					<BookIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='#app-bar-with-responsive-menu'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'inherit',
							textDecoration: 'none',
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{renderButtonItems()}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title='Open settings'>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}>
								<Avatar {...stringAvatar(name)}/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							<MenuItem
								onClick={handleLogout}>
								<Typography textAlign='center'>Logout</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
