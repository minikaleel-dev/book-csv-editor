"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Paper,
} from "@mui/material";

export default function BookTable({
	paginatedData,
	sortConfig,
	handleSort,
	handleCellEdit,
	modifiedCells,
}) {
	const headCells = ["Title", "Author", "Genre", "PublishedYear", "ISBN"];

	return (
		<TableContainer component={Paper} elevation={1}>
			<Table sx={{ minWidth: 650 }} aria-label="book data table">
				<TableHead>
					<TableRow sx={{ backgroundColor: "grey.50" }}>
						{headCells.map((headCell) => (
							<TableCell key={headCell} sx={{ fontWeight: "bold" }}>
								<TableSortLabel
									active={sortConfig?.key === headCell}
									direction={sortConfig ? sortConfig.direction : "asc"}
									onClick={() => handleSort(headCell)}
								>
									{headCell}
								</TableSortLabel>
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{paginatedData.map((book) => (
						<TableRow
							key={book.id}
							sx={{
								"&:hover": {
									backgroundColor: "grey.100",
								},
							}}
						>
							{headCells.map((field) => (
								<TableCell
									key={`${book.id}-${field}`}
									contentEditable={field !== "ISBN"}
									suppressContentEditableWarning
									onBlur={(e) =>
										handleCellEdit(book.id, field, e.target.textContent)
									}
									sx={{
										borderRight: "1px solid",
										borderColor: "divider",
										backgroundColor: modifiedCells.has(`${book.id}-${field}`)
											? "success.light"
											: "inherit",
										"&:focus": {
											outline: "1px solid",
											outlineColor: "primary.main",
										},
									}}
								>
									{book[field]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
