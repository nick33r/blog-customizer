import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import React, { useState, useRef } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type FormProps = {
	fields: React.ReactNode[];
	onSubmit: () => void;
	onReset: () => void;
	opened?: boolean;
};

export const ArticleParamsForm = ({
	fields,
	onSubmit,
	onReset,
	opened = false,
}: FormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(opened);
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
		onSubmit();
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleOpen} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<div className={styles.topContainer}>{fields}</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={onReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
