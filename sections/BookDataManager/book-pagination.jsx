"use client";

import { Stack, Typography, Pagination } from "@mui/material";

export default function BookPagination({
	totalRows,
	currentPage,
	pageCount,
	handleChangePage,
}) {
	return (
		<Stack
			direction={{ xs: "column", md: "row" }}
			spacing={2}
			justifyContent="space-between"
			alignItems="center"
			sx={{ color: "text.secondary" }}
		>
			{/* Total Rows */}
			<Typography variant="body2" fontWeight="bold">
				Total Rows: {totalRows}
			</Typography>

			{/* Pagination */}
			<Stack direction="row" spacing={2} alignItems="center">
				<Typography variant="body2" fontWeight="bold">
					Page {currentPage} of {pageCount}
				</Typography>
				<Pagination
					count={pageCount}
					page={currentPage}
					onChange={handleChangePage}
					color="primary"
					size="small"
				/>
			</Stack>
		</Stack>
	);
}
