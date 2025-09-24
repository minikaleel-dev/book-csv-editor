import "../globals.css";
import { CONFIG } from "@/config-global";
import { AppThemeProvider } from "../theme/theme-provider"; // client wrapper

export const viewport = {
	width: "device-width",
	initialScale: 1,
	themeColor: "#1976d2", // fallback, can’t use theme directly here
};

export const metadata = {
	title: `${CONFIG.appTitle} | ${CONFIG.appName}`,
	description: CONFIG.description,
	keywords: CONFIG.keywords,
	authors: [{ name: CONFIG.author }],
	openGraph: {
		title: `${CONFIG.appTitle} | ${CONFIG.appName}`,
		description: CONFIG.description,
		type: "website",
		url: CONFIG.siteUrl,
		siteName: CONFIG.siteName,
	},
	twitter: {
		card: "summary_large_image",
		title: `${CONFIG.appTitle} | ${CONFIG.appName}`,
		description: CONFIG.description,
		creator: CONFIG.twitterHandle,
	},
	icons: {
		icon: CONFIG.iconPath,
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<AppThemeProvider>{children}</AppThemeProvider>
			</body>
		</html>
	);
}
