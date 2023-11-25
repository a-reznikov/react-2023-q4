import ItemDetails from '@/components/item-details';
import { ResponseApi } from '@/components/types';
import { getDataById } from '@/store/reducers/api-slice';

import { wrapper } from '@/store/store';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async () => {
    const result = await store.dispatch(
      getDataById.initiate('5cdbdecb6dc0baeae48cfab8')
    );
    const data: ResponseApi | undefined = result.data;

    return {
      props: { data },
    };
  });

export default function Character({ data }: { data: ResponseApi | undefined }) {
  // console.log(data);

  return (
    <>
      <p>CharList</p>
      {data && <ItemDetails dataDetails={data.docs} />}
    </>
  );
}
