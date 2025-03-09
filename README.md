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
npm install slate-canvas
# 또는
yarn add slate-canvas
```

## 사용법

### 기본 사용법

```tsx
import React, { useState } from "react";
import { Editor } from "slate-canvas";
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

### Props

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

SlateCanvas를 npm에 배포하려면 다음 단계를 따르세요:

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

## 기여하기

1. 이 저장소를 포크합니다.
2. 새 브랜치를 생성합니다: `git checkout -b feature/amazing-feature`
3. 변경사항을 커밋합니다: `git commit -m 'Add some amazing feature'`
4. 브랜치에 푸시합니다: `git push origin feature/amazing-feature`
5. Pull Request를 제출합니다.

## 라이센스

MIT
