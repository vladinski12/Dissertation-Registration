# Frontend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Step 1: Install dependencies

```yarn install```

### Step 2: Start the development server

```yarn dev```

#### Material UI Issue:
There is an issue with Material UI and Vite. The issue is that there is a console error `Uncaught TypeError: createTheme_default is not a function`. To fix this, you need to run the app with `yarn dev --force`. This will force the app to run without the error. The issue can be found [here](https://github.com/mui/material-ui/issues/31835).

### Step 3: Open the app

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
