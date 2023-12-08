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
import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';
import { Context } from '../state/context/GlobalContext/Context';
import MenuIcon from '@mui/icons-material/Menu';
import routes from '../app/routesConfig';
import { useTheme } from '@mui/material/styles';

const settings = [
	{
		title: 'Profile',
		link: '/profile',
	},
	{
		title: 'Account',
		link: '/account',
	},
	{
		title: 'Logout',
		link: '/logout',
	},
];

export default function Navbar() {
	const theme = useTheme();

	const navigate = useNavigate();

	const locationPath = useLocation().pathname;

	const {
		context: { role },
	} = useContext(Context);

	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = (link) => {
		setAnchorElNav(null);
		if (link) {
			navigate(link);
		}
	};

	const handleCloseUserMenu = (link) => {
		setAnchorElUser(null);
		if (link) {
			navigate(link);
		}
	};

	const renderMenuItems = () => {
		return routes
			.filter((route) => route.title && route.roles?.includes(role))
			.map((route) => (
				<MenuItem
					key={route.title}
					selected={locationPath === route.path}
					onClick={() => handleCloseNavMenu(route.path)}
				>
					<Typography textAlign='center'>{route.title}  </Typography>
				</MenuItem>
			));
	};

	const renderButtonItems = () => {
		return routes
			.filter((route) => route.title && route.roles?.includes(role))
			.map((route) => (
				<Button
					key={route.title}
					onClick={() => handleCloseNavMenu(route.path)}
					sx={{ my: 2, color: route.path === locationPath? theme.palette.textColor.selected : theme.palette.textColor.main, display: 'block'  }}
				>
					{route.title}
				</Button>
			));
	};

	return (
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
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
						LOGO
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
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}/>
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
								<Avatar
									alt='Remy Sharp'
									src='/static/images/avatar/2.jpg'/>
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
							{settings.map((setting) => (
								<MenuItem
									key={setting.title}
									onClick={handleCloseUserMenu}>
									<Typography textAlign='center'>{setting.title}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
