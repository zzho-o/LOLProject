LOLPROJECT

**LOLProject**는 League of Legends (LoL) 사용자들을 위한 웹 애플리케이션으로, 유저가 직접 자신만의 **커스터마이징된 프로필과 루트(탭 구성)**을 만들 수 있는 기능을 제공합니다.  
앱은 크게 두 개의 주요 탭으로 구성되어 있습니다:

- **MY**: 사용자가 자신의 정보를 기반으로 개인 프로필, 즐겨찾기, 커스텀 탭 등을 구성할 수 있는 개인화 공간입니다.
- **LOLMatch**: 소환사 이름을 검색해 **전적을 조회**하고, 해당 유저의 최근 경기 결과와 주요 지표들을 확인할 수 있습니다.

부가적으로 반응형 UI, 다국어(i18n) 지원, 소셜 로그인 기능 등이 통합되어 있어 사용자 친화적인 경험을 제공합니다.

## 폴더 구조

```

```

LOLProject/
├── components/ # React 컴포넌트들을 포함하는 디렉터리
│ ├── common/ # 공통 UI 컴포넌트 (버튼, 인풋 등)
│ ├── profile/ # 프로필 관련 컴포넌트
│ ├── match/ # 경기 기록 관련 컴포넌트
│ └── ... # 기타 컴포넌트들
├── config/ # 설정 파일들을 포함하는 디렉터리 (colors, API 설정)
├── layout/ # 레이아웃 관련 컴포넌트들을 포함하는 디렉터리
├── pages/ # Next.js 페이지들을 포함하는 디렉터리 (각 URL과 매칭됨)
│ ├── index.tsx # 홈 페이지
│ └── ... # 기타 페이지들
├── public/ # 정적 파일 (이미지, 아이콘 등)
├── utils/ # 유틸리티 함수들을 포함하는 디렉터리 (API 호출, 데이터 처리 등)
├── .eslintrc.json # ESLint 설정 파일
├── .gitignore # Git에서 제외할 파일 목록
├── next.config.js # Next.js 설정 파일
├── package.json # 프로젝트 메타데이터 및 의존성 목록
├── tsconfig.json # TypeScript 설정 파일
└── README.md # 프로젝트 설명 문서

```

```

## 패키지 설치

npm install

## 개발 서버 실행

npm run dev

## 환경 변수 설정 (.env 파일 생성)

이 프로젝트는 Riot Games API와 상호작용하기 위해 환경 변수를 사용합니다.  
.env 파일을 프로젝트 루트에 생성합니다.
RIOT_API_ACCOUNT_BASE_URL=https://americas.api.riotgames.com
RIOT_API_SUMMONER_BASE_URL=https://KR.api.riotgames.com
RIOT_API_ASIA=https://asia.api.riotgames.com
TAG=KR1
RIOT_API_KEY 값은 Riot Developer Portal => (https://developer.riotgames.com/) 에서 발급받아야 합니다.

# Riot Data Dragon (챔피언 이미지 등)

NEXT_PUBLIC_RIOT_API_DATA_DRAGON_BASE_URL=https://ddragon.leagueoflegends.com

# Kakao 소셜 로그인 리다이렉트 URI

NEXT_PUBLIC_KAKAO_REDIRECT_URI=http://localhost:3000/oauth/kakao/redirect

# Supabase 연결 정보

NEXT*PUBLIC_SUPABASE_URL=프로젝트*설정에서*확인
NEXT_PUBLIC_SUPABASE_ANON_KEY=프로젝트*설정에서*확인
SUPABASE_SERVICE_ROLE_KEY=서비스*역할*키*입력

### 빠르게 기능을 확인하고 싶다면?

직접 환경 변수 설정 없이, 아래 배포 링크에서 프로젝트를 체험해볼 수 있습니다:

👉 [배포된 LOLProject 보러 가기](https://lolproject.zzho.dev)

## 주요 기능

**LOLMatch: 소환사 전적 검색**

- 소환사 닉네임을 입력하여 최근 경기 전적을 확인할 수 있습니다.
- 랭크 / 일반 / 칼바람 / AI 등 다양한 게임 모드를 자동으로 구별하여 보여줍니다.
- Riot API를 활용한 경기 상세 정보 및 플레이어 통계 제공.

- **MY: 나만의 커스터마이징 공간**

  - 사용자가 직접 API 기반으로 프로필 정보를 구성하고 저장할 수 있습니다.
  - 프로필 이미지, 닉네임, 선호 챔피언 등 개인화 설정 가능.
  - 추후 마이데이터 기능 확장 예정.

- **반응형 UI 지원**

  - 데스크톱과 모바일 환경에 최적화된 UI 제공.
  - 화면 크기에 따라 글자 크기, 요소 배치 등이 유동적으로 조정됩니다.

- **빠르고 부드러운 UI 경험**

  - Recoil을 통한 상태 관리와 Chakra UI 기반 디자인 시스템.
  - Framer Motion을 사용한 부드러운 전환 효과 및 인터랙션.

- **다국어(Localization) 지원**
  - 현재 한국어와 영어를 지원하며, i18n 기반 구조로 추가 언어 확장 가능.
  - 사용자 브라우저 언어 설정에 따라 자동 전환됩니다.

## 기술 스택

- **Frontend**:

  - **Next.js** – 서버 사이드 렌더링(SSR)과 정적 사이트 생성(SSG)을 지원하는 React 프레임워크
  - **TypeScript** – 정적 타입을 지원하여 안정성과 유지보수성 향상

- **State Management**:

  - **Recoil** – 전역 상태 관리를 간단하게 구현할 수 있는 React 상태 관리 라이브러리

- **UI 라이브러리**:

  - **Chakra UI** – 접근성과 반응성을 고려한 모던 컴포넌트 기반 UI 프레임워크
  - **Framer Motion** – 애니메이션과 인터랙션을 자연스럽게 구현하기 위한 라이브러리

- **API 통신**:

  - **Riot Games API** – 소환사 정보, 매치 전적, 챔피언 정보 등을 받아오기 위한 공식 API

- **Backend / Database**

  - **Supabase** – 인증, 사용자 데이터 저장 위한 오픈소스

- **무한 스크롤** _(진행중)_

  - 경기 전적을 스크롤할 때 자동으로 추가 로딩되도록 구현 중입니다.

- **프로필 이미지 업로드** _(진행중)_
  - 사용자가 프로필 사진을 업로드하고 저장할 수 있는 기능을 개발 중입니다.

## 배포 링크

프로젝트를 직접 체험해보고 싶다면 아래 링크에서 확인할 수 있습니다.

**배포 링크**: [LOL Project](https://lol-project-omega.vercel.app/)
