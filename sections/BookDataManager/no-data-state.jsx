"use client";

import { useRef } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { FilePlus, Upload } from "lucide-react";

export default function NoDataState({ onGenerateData, onFileUpload }) {
	const fileInputRef = useRef(null);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				p: 4,
				backgroundColor: "grey.100",
				borderRadius: "8px",
				border: "2px dashed",
				borderColor: "grey.300",
			}}
		>
			<Typography variant="h6" sx={{ mb: 2 }}>
				No data loaded.
			</Typography>

			<Stack
				direction="row"
				spacing={2}
				flexWrap="wrap"
				justifyContent="center"
			>
				<Button
					variant="contained"
					startIcon={<FilePlus size={18} />}
					onClick={onGenerateData}
					color="secondary"
				>
					Generate Sample Data
				</Button>

				<input
					type="file"
					ref={fileInputRef}
					onChange={onFileUpload}
					style={{ display: "none" }}
					accept=".csv"
				/>

				<Button
					variant="contained"
					startIcon={<Upload size={18} />}
					onClick={() => fileInputRef.current.click()}
					color="primary"
				>
					Upload CSV
				</Button>
			</Stack>
		</Box>
	);
}
