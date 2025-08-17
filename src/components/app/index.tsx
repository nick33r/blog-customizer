import { CSSProperties, useState } from 'react';
import { ArticleParamsForm } from '../article-params-form';

import { Article } from '../article';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [styleState, setStyleState] = useState<ArticleStateType>(defaultArticleState);

	const handleFormSubmit = (formState: ArticleStateType) => {
		setStyleState({ ...formState });
	};

	const handleReset = () => {
		setStyleState({ ...defaultArticleState });
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': styleState.fontFamilyOption.value,
					'--font-size': styleState.fontSizeOption.value,
					'--font-color': styleState.fontColor.value,
					'--container-width': styleState.contentWidth.value,
					'--bg-color': styleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleFormSubmit} onReset={handleReset} />
			<Article />
		</main>
	);
};
