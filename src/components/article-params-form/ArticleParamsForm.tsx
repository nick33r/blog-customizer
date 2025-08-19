import React, { useState, useRef } from 'react';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

import { useOutsideClickClose } from './hooks/useOutsideClickClose';
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
} from '../../constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type FormProps = {
	updateStyle: (newState: ArticleStateType) => void;
	opened?: boolean;
};

export const ArticleParamsForm = ({
	updateStyle,
	opened = false,
}: FormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(opened);
	const [formState, setFormState] = useState<ArticleStateType>(defaultArticleState);
	const rootRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
	});

	const toggleOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updateStyle({ ...formState });
	};

	const handleReset = () => {
		setFormState({ ...defaultArticleState });
		updateStyle({ ...defaultArticleState });
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as={'h2'} size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(val) =>
							setFormState({ ...formState, fontFamilyOption: val })
						}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						name='radio'
						onChange={(val) =>
							setFormState({ ...formState, fontSizeOption: val })
						}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={formState.fontColor}
						onChange={(val) => setFormState({ ...formState, fontColor: val })}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(val) =>
							setFormState({ ...formState, backgroundColor: val })
						}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(val) =>
							setFormState({ ...formState, contentWidth: val })
						}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
