import "./globals.css";

export const metadata = {
  title: "Bendi Elite Services",
  description: "Supplying Quality. Delivering Trust.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
