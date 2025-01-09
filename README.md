# LOLPROJECT

## 폴더 구조

```
LOLProject/
├── components/        # React 컴포넌트들을 포함하는 디렉터리
│   ├── common/
│   └── ...
├── config/            # 설정 파일들을 포함하는 디렉터리
├── layout/            # 레이아웃 관련 컴포넌트들을 포함하는 디렉터리
├── pages/             # Next.js 페이지들을 포함하는 디렉터리
├── utils/             # 유틸리티 함수들을 포함하는 디렉터리
├── .eslintrc.json     # ESLint 설정 파일
├── tsconfig.json      # TypeScript 설정 파일
└── ...
```

## 개발 및 실행 방법

### 폴더 구조에 맞게.env 파일 생성

```
RIOT_API_ACCOUNT_BASE_URL=
RIOT_API_KEY=
TAG=KR1
```

### 넥스트 웹

```bash
npm run dev
```
