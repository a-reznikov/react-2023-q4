import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'LOTR DB',
  description: 'The database of characters from The Lord of the Rings.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
