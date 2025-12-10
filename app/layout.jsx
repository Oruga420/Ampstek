import './globals.css';

export const metadata = {
  title: 'Alejandro De La Mora | Resume',
  description: 'Generative AI Solution Architect - Resume built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
