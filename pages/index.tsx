import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import * as S from './styles'
import { atomResolution } from '@/utils/recoil/atoms'
import { useRecoilState } from 'recoil'

const Home: NextPage = () => {
  // const [resolution, setResolution] = useRecoilState(atomResolution);
  return (
      <S.MainContainer>
        <Head>
          <title>my own space</title>
        </Head>
        <S.BodyContainer>
          <S.ContentsLeftContainer>
            메인컨텐츠
          </S.ContentsLeftContainer>
          <S.ContentsRightContainer>
            사이드컨텐츠
          </S.ContentsRightContainer>
        </S.BodyContainer>
      </S.MainContainer>
  )
}

export default Home
