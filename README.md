# Edit-On-Slate

Slate 기반의 리액트 텍스트 에디터 라이브러리입니다.

## 특징

- 텍스트 서식 지정 (굵게, 기울임, 밑줄, 코드)
- 블록 스타일 (제목, 인용구, 목록)
- 마크다운 단축키 지원
- 커스터마이징 가능한 스타일
- 리액트 컴포넌트로 쉽게 통합
- 다양한 폰트 및 색상 지원
- 반응형 디자인

## 설치

```bash
npm install edit-on-slate
# 또는
yarn add edit-on-slate
```

## 사용법

### 기본 사용법

```tsx
import React, { useState } from "react";
import { Editor } from "edit-on-slate";
import { Descendant } from "slate";

const MyEditor = () => {
	const [value, setValue] = useState<Descendant[]>([
		{
			type: "paragraph",
			children: [{ text: "에디터에 내용을 입력해보세요!" }],
		},
	]);

	const handleChange = (newValue: Descendant[]) => {
		setValue(newValue);
	};

	return <Editor value={value} onChange={handleChange} />;
};

export default MyEditor;
```

### 폰트 사용 방법

이 라이브러리는 기본적으로 CDN을 통해 웹 폰트(Nanum Gothic, Pretendard)를 로드합니다. 빌드에 폰트 파일을 포함하지 않고 다음과 같은 방법으로 폰트를 사용할 수 있습니다:

#### 1. 기본 제공 폰트 사용하기

라이브러리를 import하면 자동으로 CDN을 통해 폰트가 로드됩니다. 별도의 설정이 필요하지 않습니다.

```tsx
import { Editor } from "edit-on-slate";
// 폰트 스타일시트가 자동으로 로드됩니다
```

#### 2. 커스텀 폰트 사용하기

자신만의 폰트를 사용하려면 CSS 변수를 재정의하세요:

```css
:root {
  --font-family-sans: "나눔고딕", "맑은 고딕", sans-serif;
  --font-family-serif: "나눔명조", serif;
  --font-family-mono: "D2Coding", monospace;
}
```

#### 3. CDN 폰트 직접 로드하기

라이브러리의 폰트 로딩을 비활성화하고 직접 폰트를 로드하려면:

```html
<!-- HTML의 head 섹션에 추가 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css">
```

#### 4. 폰트 로딩 유틸리티 사용하기

라이브러리에서 제공하는 폰트 로딩 유틸리티를 사용하여 폰트 로딩을 최적화할 수 있습니다:

```tsx
import { loadFontStylesheet, waitForFont, isFontLoaded } from "edit-on-slate";

// 최적화된 방식으로 폰트 스타일시트 로드
loadFontStylesheet('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');

// 폰트가 로드되었는지 확인
const isLoaded = isFontLoaded('Noto Sans KR');
console.log('폰트 로드 여부:', isLoaded);

// 폰트가 로드될 때까지 기다리기
waitForFont('Noto Sans KR').then(loaded => {
  if (loaded) {
    console.log('폰트가 성공적으로 로드되었습니다!');
  } else {
    console.log('폰트 로딩 타임아웃');
  }
});

// 기본 폰트 로드 (Nanum Gothic, Pretendard)
import { loadDefaultFonts } from "edit-on-slate";
loadDefaultFonts();
```

## Props

| 속성        | 타입                          | 기본값                 | 설명                                   |
| ----------- | ----------------------------- | ---------------------- | -------------------------------------- |
| value       | Descendant[]                  | -                      | 에디터의 현재 값                       |
| onChange    | (value: Descendant[]) => void | -                      | 에디터 값이 변경될 때 호출되는 함수    |
| placeholder | string                        | '내용을 입력하세요...' | 에디터가 비어있을 때 표시되는 텍스트   |
| readOnly    | boolean                       | false                  | 읽기 전용 모드 활성화 여부             |
| className   | string                        | -                      | 에디터 컨테이너에 적용할 CSS 클래스    |
| style       | React.CSSProperties           | -                      | 에디터 컨테이너에 적용할 인라인 스타일 |

## 마크다운 단축키

에디터는 다음과 같은 마크다운 단축키를 지원합니다:

- `#` + 공백: 제목 1
- `##` + 공백: 제목 2
- `###` + 공백: 제목 3
- `>` + 공백: 인용구
- `-` 또는 `*` 또는 `+` + 공백: 글머리 기호 목록
- `1.` + 공백: 번호 매기기 목록

## 커스터마이징

에디터의 스타일은 CSS-in-JS 라이브러리인 Emotion을 사용하여 구현되었습니다. 스타일을 커스터마이징하려면 컴포넌트를 확장하거나 CSS 클래스를 오버라이드하세요.

## 배포하기

Edit-On-Slate를 npm에 배포하려면 다음 단계를 따르세요:

1. 버전 업데이트:
```bash
npm version patch # 패치 버전 업데이트
npm version minor # 마이너 버전 업데이트
npm version major # 메이저 버전 업데이트
```

2. npm에 배포:
```bash
npm run publish:npm
```

## Git 릴리스 및 태깅

릴리스를 생성할 때는 다음 가이드라인을 따르세요:

1. 버전 이름에 'v' 접두사 사용하기:
   - 예: `v1.0.0`, `v2.3.4`

2. 프로덕션용이 아닌 경우 pre-release 버전 추가:
   - 예: `v0.2.0-alpha`, `v5.9-beta.3`

3. Semantic Versioning 규칙 따르기:
   - **MAJOR**: 호환되지 않는 API 변경 시 (예: `v2.0.0`)
   - **MINOR**: 이전 버전과 호환되는 기능 추가 시 (예: `v1.1.0`)
   - **PATCH**: 이전 버전과 호환되는 버그 수정 시 (예: `v1.0.1`)
   - **PRE-RELEASE**: 개발 단계 표시 (예: `v1.0.0-alpha.1`)

4. 릴리스 노트 작성 시 다음 내용 포함:
   - 새로운 기능
   - 버그 수정
   - 주요 변경 사항
   - 사용 중단 예정 기능

새 릴리스는 자동으로 이 저장소의 최신 릴리스로 표시됩니다. 필요한 경우 'Set as the latest release' 옵션을 해제하여 semantic version과 생성 날짜에 따라 최신 릴리스가 결정되도록 할 수 있습니다.

## 기여하기

1. 이 저장소를 포크합니다.
2. 새 브랜치를 생성합니다: `git checkout -b feature/amazing-feature`
3. 변경사항을 커밋합니다: `git commit -m 'Add some amazing feature'`
4. 브랜치에 푸시합니다: `git push origin feature/amazing-feature`
5. Pull Request를 제출합니다.

## 라이센스

MIT
