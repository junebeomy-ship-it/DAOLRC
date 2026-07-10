# 일본 맛집 파인더 🍜

도쿄·오사카·삿포로·후쿠오카·나고야·교토의 인기 음식점과 카페를 지역별로 찾아주는 검색형 웹앱입니다. 지역을 선택하면 가게 이름, 로고, 영업시간, 대표 메뉴가 카드로 표시됩니다.

빌드 도구·의존성이 없는 순수 정적 사이트(HTML/CSS/JS)라 Vercel에 그대로 올리면 바로 배포됩니다.

## 파일 구성

- `index.html` — 페이지 구조
- `styles.css` — 디자인
- `app.js` — 검색·필터·카드 렌더링
- `data.js` — 도시별 맛집 데이터 (여기만 고치면 내용이 바뀝니다)
- `vercel.json` — Vercel 설정

## Vercel 배포 방법

### 방법 A. 드래그 앤 드롭 (가장 간단)

1. https://vercel.com 로그인
2. Add New… → Project
3. 이 폴더의 파일 전체를 업로드(드래그) 후 Deploy

### 방법 B. GitHub 연동 (자동 재배포)

1. 이 폴더를 GitHub 저장소로 push
2. Vercel에서 New Project → 해당 저장소 Import
3. Framework Preset은 **Other**(정적 사이트) 그대로 두고 Deploy
   - Build Command / Output Directory 설정 불필요

### 방법 C. Vercel CLI

```bash
npm i -g vercel
cd 이_폴더
vercel        # 미리보기 배포
vercel --prod # 프로덕션 배포
```

## 맛집 추가·수정

`data.js`의 `places` 안 도시별 배열에 항목을 추가하면 됩니다.

```js
{
  name: "가게 이름", jp: "日本語 名前", type: "음식점", // 또는 "카페"
  category: "ramen",   // 로고 색/이모지 결정 (data.js 상단 주석 참고)
  hours: "매일 11:00–22:00",
  area: "시부야",
  menu: ["대표 메뉴1", "대표 메뉴2", "대표 메뉴3"]
}
```

새 도시는 `cities` 배열에 `{ id, name, jp, emoji }`를 추가하고 `places`에 같은 `id` 키로 목록을 넣으면 됩니다.

> 영업시간·메뉴는 변동될 수 있어 방문 전 확인을 권장합니다. 로고는 저작권 문제를 피하기 위해 카테고리별 이모지 아바타로 생성됩니다.
