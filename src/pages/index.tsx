import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { Errors, ResponseApi } from '@/components/types';
import { getData, getDataById } from '@/store/reducers/api-slice';

import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

import Header from '@/components/header';
import Main from '@/components/main';
import ItemList from '@/components/item-list';
import ItemDetails from '@/components/item-details';
import ErrorBoundry from '@/components/error-boundry';
import App from '@/components/app';
import ErrorMessage from '@/components/error-message';
import Footer from '@/components/footer';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { name, limit, page, id } = context.query;

    const [resultData, resultDetails] = await Promise.all([
      store.dispatch(
        getData.initiate({
          term: `${name || ''}`,
          limit: `${limit || '10'}`,
          page: `${page || '1'}`,
        })
      ),
      store.dispatch(getDataById.initiate(`${id || ''}`)),
    ]);

    const data: ResponseApi | undefined | null = resultData.isSuccess
      ? resultData.data
      : null;

    const dataDetails: ResponseApi | undefined | null = resultDetails.isSuccess
      ? id
        ? resultDetails.data
        : null
      : null;
    const errorData: string =
      resultData.status === 'rejected'
        ? 'data' in resultData.error
          ? `${resultData.error.data}`
          : ''
        : '';
    const isErrorDetails: boolean = resultDetails.isError;

    return {
      props: { data, dataDetails, errorData, isErrorDetails },
    };
  });

export default function Home({
  data,
  dataDetails,
  errorData,
  isErrorDetails,
}: {
  data: ResponseApi | undefined;
  dataDetails: ResponseApi | undefined | null;
  errorData: string;
  isErrorDetails: boolean;
}) {
  const router: NextRouter = useRouter();
  const [loadingData, setLoadingData] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const params = new URLSearchParams(`${router.asPath}`.slice(1));
  const isLoadingDetails = params.has('id');

  useEffect(() => {
    const start = () => {
      if (isLoadingDetails) setLoadingDetails(true);
      else setLoadingData(true);
    };
    const end = () => {
      setLoadingDetails(false);
      setLoadingData(false);
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);
    };
  }, [isLoadingDetails, router.events]);

  const detailsMessage = isErrorDetails ? (
    <p className="list-message text-warning text-center">{Errors.wrongId}</p>
  ) : null;
  const content: React.JSX.Element = !errorData ? (
    <App>
      <Header data={data} />
      <Main>
        {detailsMessage}
        {data && (
          <ItemList loading={loadingData} data={data.docs}>
            {dataDetails && (
              <ItemDetails
                loading={loadingDetails}
                dataDetails={dataDetails.docs}
              />
            )}
          </ItemList>
        )}
      </Main>
      <Footer />
    </App>
  ) : (
    <ErrorMessage message={errorData} />
  );
  return (
    <>
      <Head>
        <title>LOTR DB</title>
        <meta name="description" content="Lord of the rings data base" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundry>{content}</ErrorBoundry>
    </>
  );
}
