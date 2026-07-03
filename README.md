# 팀 업무 보드

세미나 / 리퀘스트 / 콜 / NDR·콥데이 / 타부서 지원 5개 탭으로 구성된 팀 내부 공유 웹앱입니다.
각 탭에서 팀원이 로그인 후 글(제목+내용)을 등록하고, 등록된 글 목록을 볼 수 있습니다.

## 1. Supabase 프로젝트 만들기 (최초 1회)

1. https://supabase.com 에서 회원가입 후 새 프로젝트를 만듭니다. (무료 플랜으로 충분)
2. 프로젝트가 생성되면 좌측 메뉴 **SQL Editor**를 열고, 이 저장소의 [supabase-schema.sql](supabase-schema.sql) 내용을 붙여넣어 실행합니다. (`users`, `posts` 테이블이 생성됩니다)
3. 좌측 메뉴 **Project Settings > API**에서 다음 두 값을 확인합니다.
   - `Project URL` → `SUPABASE_URL`
   - `service_role` 비밀 키(secret) → `SUPABASE_SERVICE_ROLE_KEY` (절대 외부에 노출하면 안 되는 키입니다)

## 2. 로컬 환경변수 설정

`.env.local.example` 파일을 복사해 `.env.local` 파일을 만들고 값을 채웁니다.

```bash
cp .env.local.example .env.local
```

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: 위에서 확인한 값
- `SESSION_SECRET`: 터미널에서 `openssl rand -base64 32` 실행 후 나온 값을 그대로 붙여넣기

## 3. 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000 접속 → `/login`으로 자동 이동 → 회원가입 후 사용합니다.

## 4. 배포 (Vercel)

1. 이 프로젝트를 GitHub 저장소에 올립니다.
2. https://vercel.com 에서 해당 저장소를 Import 합니다.
3. Vercel 프로젝트 설정 > Environment Variables에 `.env.local`과 동일한 3개 값(`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SESSION_SECRET`)을 등록합니다.
4. 배포가 끝나면 발급된 URL을 팀원들에게 공유하면 됩니다. 팀원은 `/signup`에서 계정을 만들고 로그인하면 됩니다.

## 구조 참고

- 인증: 아이디+비밀번호 기반 간단 로그인 (bcrypt 해시 + JWT 세션 쿠키, `src/lib/auth.ts`)
- 데이터: Supabase(Postgres) `posts` 테이블에 `category` 컬럼으로 5개 탭 구분 저장
- 입력 항목: 세미나·리퀘스트·콜·타부서 지원은 `일시/애널리스트/대상자`, NDR·콥데이는 `일시/애널리스트/기관/기업`을 입력합니다. 카테고리별 필드 구성은 `src/lib/categories.ts`의 `fieldSet`으로 관리하며, 폼 UI는 `src/components/PostForm.tsx`, 저장 로직은 `src/app/actions.ts`의 `createPost`에 있습니다.
