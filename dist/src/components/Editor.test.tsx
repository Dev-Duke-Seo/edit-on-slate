import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Editor } from "../index";
import { Descendant } from "slate";
import { CustomElement } from "../../../utils/types";

// 이미지 모킹
jest.mock('../../../assets/icons/font-bold.png', () => 'font-bold.png');
jest.mock('../../../assets/icons/font-italic.png', () => 'font-italic.png');
jest.mock('../../../assets/icons/font-underline.png', () => 'font-underline.png');
jest.mock('../../../assets/icons/bullet-point.png', () => 'bullet-point.png');
jest.mock('../../../assets/icons/bullet-number.png', () => 'bullet-number.png');
jest.mock('../../../assets/icons/alignment-center.png', () => 'alignment-center.png');
jest.mock('../../../assets/icons/alignment-right.png', () => 'alignment-right.png');
jest.mock('../../../assets/icons/alignment-both.png', () => 'alignment-both.png');
jest.mock('../../../assets/icons/font-color.png', () => 'font-color.png');

describe("Editor 컴포넌트", () => {
	test("기본 렌더링", () => {
		render(<Editor />);

		// 에디터 컨테이너가 렌더링되었는지 확인
		expect(screen.getByTestId("slate-editor")).toBeInTheDocument();

		// 툴바 버튼이 렌더링되었는지 확인 (이미지 alt 텍스트로 확인)
		expect(screen.getByAltText("Bold")).toBeInTheDocument();
		expect(screen.getByAltText("Italic")).toBeInTheDocument();
		expect(screen.getByAltText("Underline")).toBeInTheDocument();
	});

	test("readOnly 모드", () => {
		render(<Editor readOnly={true} />);

		// 에디터 컨테이너가 렌더링되었는지 확인
		expect(screen.getByTestId("slate-editor")).toBeInTheDocument();

		// readOnly 모드에서는 툴바 버튼이 렌더링되지 않아야 함
		expect(screen.queryByAltText("Bold")).not.toBeInTheDocument();
	});

	test("초기 값 설정", () => {
		const initialValue: Descendant[] = [
			{
				type: "paragraph" as CustomElement["type"],
				children: [{ text: "테스트 텍스트" }],
			} as CustomElement,
		];

		render(<Editor value={initialValue} />);

		// 초기 값이 렌더링되었는지 확인
		expect(screen.getByText("테스트 텍스트")).toBeInTheDocument();
	});
});
