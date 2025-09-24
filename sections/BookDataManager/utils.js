// --- Mock data for generation (self-contained) ---
const fakeTitles = [
	"The Midnight Library",
	"Project Hail Mary",
	"Where the Crawdads Sing",
	"The Seven Husbands of Evelyn Hugo",
	"Circe",
	"The Silent Patient",
	"The Vanishing Half",
	"A Gentleman in Moscow",
	"The Song of Achilles",
	"The Dutch House",
	"Educated",
	"Little Fires Everywhere",
	"The Power",
	"Becoming",
	"Sapiens",
];

const fakeAuthors = [
	"Matt Haig",
	"Andy Weir",
	"Delia Owens",
	"Taylor Jenkins Reid",
	"Madeline Miller",
	"Alex Michaelides",
	"Brit Bennett",
	"Amor Towles",
	"Michelle Obama",
	"Yuval Noah Harari",
	"Celeste Ng",
	"Naomi Alderman",
];

const fakeGenres = [
	"Fantasy",
	"Science Fiction",
	"Mystery",
	"Historical Fiction",
	"Romance",
	"Thriller",
	"Biography",
	"Non-Fiction",
	"Young Adult",
	"Contemporary Fiction",
];

// A simple UUID generator for unique IDs
export const generateUUID = () => {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
};

// --- Mock data generation function (now self-contained) ---
export const generateFakeData = (numRows) => {
	const data = [];
	for (let i = 0; i < numRows; i++) {
		data.push({
			id: generateUUID(),
			Title: fakeTitles[Math.floor(Math.random() * fakeTitles.length)],
			Author: fakeAuthors[Math.floor(Math.random() * fakeAuthors.length)],
			Genre: fakeGenres[Math.floor(Math.random() * fakeGenres.length)],
			PublishedYear: 1950 + Math.floor(Math.random() * 70),
			ISBN: `978-${Math.floor(Math.random() * 1000)}-${Math.floor(
				Math.random() * 1000000
			)}-${Math.floor(Math.random() * 10)}`,
		});
	}
	return data;
};

// --- Custom CSV Parser ---
export const parseCSV = (csvText) => {
	const lines = csvText.trim().split(/\r?\n/);
	if (lines.length === 0) return [];

	const headers = lines[0]
		.split(",")
		.map((h) => h.trim().replace(/^"|"$/g, ""));
	const data = [];

	for (let i = 1; i < lines.length; i++) {
		const row = lines[i];
		if (!row.trim()) continue;

		let inQuotes = false;
		let cell = "";
		const cells = [];

		for (let j = 0; j < row.length; j++) {
			const char = row[j];
			if (char === '"') {
				inQuotes = !inQuotes;
			} else if (char === "," && !inQuotes) {
				cells.push(cell.trim().replace(/^"|"$/g, ""));
				cell = "";
			} else {
				cell += char;
			}
		}
		cells.push(cell.trim().replace(/^"|"$/g, ""));

		const book = { id: generateUUID() };
		headers.forEach((header, index) => {
			if (header === "PublishedYear" && cells[index]) {
				book[header] = parseInt(cells[index], 10);
			} else {
				book[header] = cells[index];
			}
		});
		data.push(book);
	}
	return data;
};
