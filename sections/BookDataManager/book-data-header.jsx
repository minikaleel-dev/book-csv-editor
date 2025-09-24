"use client";

import { Box, Typography } from "@mui/material";

export default function BookDataHeader() {
	return (
		<Box sx={{ textAlign: "center" }}>
			<Typography
				variant="h3"
				component="h1"
				fontWeight="bold"
				color="text.primary"
			>
				Notion Press
			</Typography>
			<Typography
				variant="h4"
				component="h2"
				color="text.secondary"
				sx={{ mt: 1 }}
			>
				Book Data Editor
			</Typography>
			<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
				Upload a CSV file or generate sample data to get started.
			</Typography>
		</Box>
	);
}
