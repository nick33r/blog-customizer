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
	defaultArticleState,

	// типы
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
import { Select } from './ui/select';
import { RadioGroup } from './ui/radio-group';
import { Separator } from './ui/separator';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [selected, setSelected] =
		useState<ArticleStateType>(defaultArticleState);
	const [styleState, setStyleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleFormSubmit = () => {
		setStyleState({ ...selected });
	};

	const handleReset = () => {
		setSelected({ ...defaultArticleState });
		setStyleState({ ...defaultArticleState });
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': styleState.fontFamilyOption.value,
					'--font-size': styleState.fontSizeOption.value,
					'--font-color': styleState.fontColor.value,
					'--container-width': styleState.contentWidth.value,
					'--bg-color': styleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleFormSubmit}
				onReset={handleReset}
				fields={[
					<Select
						key='fontFamily'
						selected={selected.fontFamilyOption}
						onChange={(val) =>
							setSelected({ ...selected, fontFamilyOption: val })
						}
						options={fontFamilyOptions}
						title='шрифт'
					/>,
					<RadioGroup
						key='fontSize'
						selected={selected.fontSizeOption}
						name='radio'
						onChange={(val) =>
							setSelected({ ...selected, fontSizeOption: val })
						}
						options={fontSizeOptions}
						title='размер шрифта'
					/>,
					<Select
						key='fontColor'
						selected={selected.fontColor}
						onChange={(val) => setSelected({ ...selected, fontColor: val })}
						options={fontColors}
						title='цвет шрифта'
					/>,
					<Separator key='separator' />,
					<Select
						key='backgroundColor'
						selected={selected.backgroundColor}
						onChange={(val) =>
							setSelected({ ...selected, backgroundColor: val })
						}
						options={backgroundColors}
						title='цвет фона'
					/>,
					<Select
						key='contentWidth'
						selected={selected.contentWidth}
						onChange={(val) => setSelected({ ...selected, contentWidth: val })}
						options={contentWidthArr}
						title='ширина контента'
					/>,
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
