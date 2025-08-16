import { createRoot } from 'react-dom/client';
import { useState, StrictMode, CSSProperties } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	// объекты с данными для пропсов инпутов
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,

	// дефолтные значения инпутов
	defaultArticleState
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { RadioGroup } from './ui/radio-group';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [fontFamily, setFontFamily] = useState(defaultArticleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(defaultArticleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(defaultArticleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(defaultArticleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(defaultArticleState.contentWidth);

	const handleFormSubmit = () => {
		console.log('submit');
	};

	const handleReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				opened={true}
				onSubmit={handleFormSubmit}
				onReset={handleReset}
				fields={[
					<Select
						selected={fontFamily}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
					/>,
					<RadioGroup
						selected={fontSize}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>,
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>,
					<Separator />,
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>,
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='ширина контента'
					/>
				]}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
