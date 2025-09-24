"use client";

import { Grid, TextField, Stack, Button } from "@mui/material";
import { RotateCcw, Download } from "lucide-react";

export default function BookControls({
	filterText,
	setFilterText,
	setCurrentPage,
	handleResetEdits,
	handleDownload,
}) {
	return (
		<Grid container spacing={2} alignItems="center">
			{/* Filter Input */}
			<Grid item xs={12} md={6}>
				<TextField
					size="small"
					fullWidth
					label="Filter Records"
					variant="outlined"
					value={filterText}
					onChange={(e) => {
						setFilterText(e.target.value);
						setCurrentPage(1);
					}}
				/>
			</Grid>

			{/* Buttons */}
			<Grid item xs={12} md={6}>
				<Stack
					direction="row"
					spacing={2}
					justifyContent={{ xs: "flex-start", md: "flex-end" }}
					flexWrap="wrap"
				>
					<Button
						variant="contained"
						startIcon={<RotateCcw size={18} />}
						onClick={handleResetEdits}
						color="warning"
					>
						Reset Edits
					</Button>
					<Button
						variant="contained"
						startIcon={<Download size={18} />}
						onClick={handleDownload}
						color="primary"
					>
						Download CSV
					</Button>
				</Stack>
			</Grid>
		</Grid>
	);
}
