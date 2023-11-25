import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <>
      <Head>
        <title>LOTR DB</title>
        <meta name="description" content="Lord of the rings data base" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>App</h1>
      <Link href="/character">Characters</Link>
    </>
  );
}
