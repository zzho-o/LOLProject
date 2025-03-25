LOLPROJECT

LOLPROJECT는 리그 오브 레전드(LoL) 전적 검색 및 프로필 커스터마이징 기능을 제공하는 웹 애플리케이션입니다. Next.js 기반으로 개발되었으며, Riot API를 활용하여 게임 데이터를 조회합니다.

## 폴더 구조

```
LOLProject/
├── components/ # React 컴포넌트들을 포함하는 디렉터리
│ ├── common/ # 공통 UI 컴포넌트 (버튼, 카드 등)
│ ├── profile/ # 프로필 관련 컴포넌트
│ ├── match/ # 경기 기록 관련 컴포넌트
│ └── ...
├── config/ # 설정 파일들을 포함하는 디렉터리 (예: colors, API 설정)
├── layout/ # 레이아웃 관련 컴포넌트들을 포함하는 디렉터리 (예: 네비게이션, 페이지 구조)
├── pages/ # Next.js 페이지들을 포함하는 디렉터리 (각 URL과 매칭됨)
│ ├── index.tsx # 홈 페이지
│ ├── profile.tsx # 프로필 검색 페이지
│ ├── match.tsx # 전적 페이지
│ └── ...
├── public/ # 정적 파일 (이미지, 아이콘 등)
├── utils/ # 유틸리티 함수들을 포함하는 디렉터리 (API 호출, 데이터 처리 등)
├── .eslintrc.json # ESLint 설정 파일
├── .gitignore # Git에서 제외할 파일 목록
├── next.config.js # Next.js 설정 파일
├── package.json # 프로젝트 메타데이터 및 의존성 목록
├── tsconfig.json # TypeScript 설정 파일
└── README.md # 프로젝트 설명 문서
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
RIOT_API_KEY 값은 Riot Developer Portal => (https://developer.riotgames.com/)에서 발급받아야 합니다.

## 주요 기능

- LoL 전적 검색: 소환사 닉네임을 입력하여 최근 경기 전적을 확인할 수 있습니다.

- 랭크 및 일반 게임 구분: 게임 타입을 인식하여 랭크/일반/칼바람 등의 게임 모드를 구별합니다.

- 프로필 커스터마이징: API를 활용한 맞춤형 프로필 설정 기능을 제공합니다.

- 빠른 UI 렌더링: Recoil, Chakra UI, Framer Motion을 활용하여 최적화된 UI를 제공합니다.
- 반응형 UI 지원:

  - 데스크톱과 모바일 환경에 최적화

  - 화면 크기에 따라 글자 크기, 배치, UI 요소가 동적으로 조정됨

## 기술 스택

Frontend: Next.js, TypeScript

State Management: Recoil

UI 라이브러리: Chakra UI, Framer Motion

API 통신: Riot Games API

## 배포 링크

프로젝트를 직접 체험해보고 싶다면 아래 링크에서 확인할 수 있습니다.

**배포 링크**: [LOL Project](https://lol-project-omega.vercel.app/)
