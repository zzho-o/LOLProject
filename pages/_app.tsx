import { RecoilRoot } from 'recoil';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react';
import Layout from 'layout';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);
  //getLayout으로 레이아웃을 직접 렌더링하지 않으면 기본 레이아웃으로 렌더링

  return <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
}

export default MyApp
