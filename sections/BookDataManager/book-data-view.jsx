"use client";

import React, { useState, useMemo } from "react";
import { Box, Stack, Alert } from "@mui/material";
import { generateFakeData, parseCSV } from "./utils";
import BookTable from "./book-table";
import BookControls from "./book-controls";
import BookPagination from "./book-pagination";
import LoadingSpinner from "./loading-spinner";
import NoDataState from "./no-data-state";
import BookDataHeader from "./book-data-header";

//----------------------------------UI Utils Start--------------------------------------------------
const containerStyles = {
	minHeight: "100vh",
	backgroundColor: "background.default",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	py: 2,
};

const cardContainerStyles = {
	width: "100%",
	maxWidth: "1200px",
	p: { xs: 2, md: 4 },
	mx: "auto",
	backgroundColor: "background.paper",
	borderRadius: "12px",
	boxShadow:
		"0px 20px 25px -5px rgba(0,0,0,0.1), 0px 10px 10px -5px rgba(0,0,0,0.04)",
	overflowX: "hidden",
};
//----------------------------------UI Utils End----------------------------------------------------

//----------------------------------JS Utils Start--------------------------------------------------
const rowsPerPage = 50;
//----------------------------------JS Utils End----------------------------------------------------

// =============================================
//  Main Component
// =============================================
const BookDataView = () => {
	const [loading, setLoading] = useState(false);
	const [originalData, setOriginalData] = useState([]);
	const [currentData, setCurrentData] = useState([]);
	const [filterText, setFilterText] = useState("");
	const [sortConfig, setSortConfig] = useState(null);
	const [modifiedCells, setModifiedCells] = useState(new Map());
	const [currentPage, setCurrentPage] = useState(1);
	const [error, setError] = useState(null);
	const hasData = currentData.length > 0;

	const handleGenerateData = () => {
		setError(null);
		setLoading(true);
		setTimeout(() => {
			const data = generateFakeData(10000);
			setOriginalData(data);
			setCurrentData(data);
			setLoading(false);
			setModifiedCells(new Map());
			setFilterText("");
			setSortConfig(null);
			setCurrentPage(1);
		}, 1000);
	};

	const handleFileUpload = (event) => {
		const file = event.target.files[0];
		if (!file) return;

		setError(null);
		setLoading(true);

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const csvText = e.target.result;
				const data = parseCSV(csvText);
				if (data.length === 0) {
					throw new Error("CSV file is empty or invalid.");
				}
				setOriginalData(data);
				setCurrentData(data);
				setLoading(false);
				setModifiedCells(new Map());
				setFilterText("");
				setSortConfig(null);
				setCurrentPage(1);
			} catch (err) {
				console.error("Error parsing CSV:", err);
				setError("Failed to parse the CSV file. Please check its format.");
				setLoading(false);
			}
		};
		reader.readAsText(file);
	};

	const handleCellEdit = (bookId, field, newValue) => {
		const originalBook = originalData.find((book) => book.id === bookId);
		if (!originalBook) return;

		const originalValue = String(originalBook[field] || "");
		const newTrimmedValue = newValue.trim();

		const newData = currentData.map((book) =>
			book.id === bookId ? { ...book, [field]: newTrimmedValue } : book
		);
		setCurrentData(newData);

		setModifiedCells((prev) => {
			const newMap = new Map(prev);
			const cellKey = `${bookId}-${field}`;

			if (newTrimmedValue !== originalValue) {
				newMap.set(cellKey, true);
			} else {
				newMap.delete(cellKey);
			}
			return newMap;
		});
	};

	const handleResetEdits = () => {
		setCurrentData(originalData);
		setModifiedCells(new Map());
		setFilterText("");
		setSortConfig(null);
		setCurrentPage(1);
	};

	const handleDownload = () => {
		const header = "Title,Author,Genre,PublishedYear,ISBN\n";
		const csvRows = filteredAndSortedData
			.map(
				(book) =>
					`"${book.Title}","${book.Author}","${book.Genre}",${book.PublishedYear},"${book.ISBN}"`
			)
			.join("\n");

		const csvContent = header + csvRows;
		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", "book_data_edited.csv");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const filteredAndSortedData = useMemo(() => {
		let filtered = currentData.filter(
			(book) =>
				book.Title?.toLowerCase().includes(filterText.toLowerCase()) ||
				book.Author?.toLowerCase().includes(filterText.toLowerCase()) ||
				book.Genre?.toLowerCase().includes(filterText.toLowerCase())
		);

		if (sortConfig !== null) {
			filtered.sort((a, b) => {
				const aValue = a[sortConfig.key] ? String(a[sortConfig.key]) : "";
				const bValue = b[sortConfig.key] ? String(b[sortConfig.key]) : "";

				if (aValue < bValue) {
					return sortConfig.direction === "asc" ? -1 : 1;
				}
				if (aValue > bValue) {
					return sortConfig.direction === "asc" ? 1 : -1;
				}
				return 0;
			});
		}

		return filtered;
	}, [currentData, filterText, sortConfig]);

	const handleSort = (key) => {
		let direction = "asc";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "asc"
		) {
			direction = "desc";
		}
		setSortConfig({ key, direction });
	};

	const totalRows = filteredAndSortedData.length;
	const pageCount = Math.ceil(totalRows / rowsPerPage);

	const paginatedData = useMemo(() => {
		const startIndex = (currentPage - 1) * rowsPerPage;
		return filteredAndSortedData.slice(startIndex, startIndex + rowsPerPage);
	}, [filteredAndSortedData, currentPage, rowsPerPage]);

	const handleChangePage = (_, newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<Box sx={containerStyles}>
			<Stack spacing={4} sx={cardContainerStyles}>
				<BookDataHeader />

				{error && (
					<Alert severity="error" sx={{ width: "100%" }}>
						{error}
					</Alert>
				)}

				{!hasData && !loading && (
					<NoDataState
						onGenerateData={handleGenerateData}
						onFileUpload={handleFileUpload}
					/>
				)}

				{loading && <LoadingSpinner size={60} height="12rem" />}

				{hasData && !loading && (
					<Stack spacing={4}>
						{/* Filters + Buttons */}
						<BookControls
							filterText={filterText}
							setFilterText={setFilterText}
							setCurrentPage={setCurrentPage}
							handleResetEdits={handleResetEdits}
							handleDownload={handleDownload}
						/>

						{/* Table */}
						<BookTable
							paginatedData={paginatedData}
							sortConfig={sortConfig}
							handleSort={handleSort}
							handleCellEdit={handleCellEdit}
							modifiedCells={modifiedCells}
						/>

						{/* Pagination */}
						<BookPagination
							totalRows={totalRows}
							currentPage={currentPage}
							pageCount={pageCount}
							handleChangePage={handleChangePage}
						/>
					</Stack>
				)}
			</Stack>
		</Box>
	);
};

export default BookDataView;
