import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { ResponseApi } from '@/components/types';
import { getData, getDataById } from '@/store/reducers/api-slice';

import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

import Header from '@/components/header';
import Main from '@/components/main';
import ItemList from '@/components/item-list';
import ItemDetails from '@/components/item-details';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { name, limit, page, id } = context.query;

    const resultData = await store.dispatch(
      getData.initiate({
        term: `${name || ''}`,
        limit: `${limit || '10'}`,
        page: `${page || '1'}`,
      })
    );
    const resultDetails = await store.dispatch(
      getDataById.initiate(`${id || ''}`)
    );

    const data: ResponseApi | undefined = resultData.data;

    const dataDetails: ResponseApi | undefined | null = id
      ? resultDetails.data
      : null;

    return {
      props: { data, dataDetails },
    };
  });

export default function Home({
  data,
  dataDetails,
}: {
  data: ResponseApi | undefined;
  dataDetails: ResponseApi | undefined | null;
}) {
  return (
    <>
      <Head>
        <title>LOTR DB</title>
        <meta name="description" content="Lord of the rings data base" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header data={data} />
      <Link href="/character">Characters</Link>
      <Main>
        {data && (
          <ItemList data={data.docs}>
            {dataDetails && <ItemDetails dataDetails={dataDetails.docs} />}
          </ItemList>
        )}
      </Main>
    </>
  );
}
