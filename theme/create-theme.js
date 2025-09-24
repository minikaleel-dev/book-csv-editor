"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		primary: {
			main: "#1976d2", // blue
		},
		secondary: {
			main: "#9c27b0", // purple
		},
		success: {
			main: "#00A76F", // A clear green for success highlights
			light: "#D6F1E8",
		},
		error: {
			main: "#d32f2f",
		},
		background: {
			default: "#f9f9f9",
			paper: "#fff",
		},
	},
	typography: {
		fontFamily: [
			"Public Sans Variable",
			"Barlow",
			"DM Sans Variable",
			"Inter Variable",
			"Nunito Sans Variable",
			"sans-serif",
		].join(","),
	},
	shape: {
		borderRadius: 8,
	},
});
