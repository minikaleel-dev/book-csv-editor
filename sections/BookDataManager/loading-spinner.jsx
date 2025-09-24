"use client";

import { Box, CircularProgress } from "@mui/material";

export default function LoadingSpinner({ size = 60, height = "12rem" }) {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height,
			}}
		>
			<CircularProgress size={size} />
		</Box>
	);
}
