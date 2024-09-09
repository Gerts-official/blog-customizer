import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'components/text/Text';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group/RadioGroup';
import { Separator } from '../separator/Separator';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	const handleToggle = () => setIsOpen(!isOpen);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault(); // Предотвратить отправку формы и перезагрузку страницы
		setCurrentArticleState(selectArticleState);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault(); // Предотвратить отправку формы и перезагрузку страницыw
		setCurrentArticleState(defaultArticleState);
		setSelectArticleState(defaultArticleState);
	};

	useEffect(() => {
		// Функция для обработки кликов вне сайдбара
		const handleClickOutside = (event: MouseEvent) => {
			// Проверяем, был ли клик вне контейнера при открытом окне
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node) &&
				isOpen
			) {
				handleToggle(); // Закрываем сайдбар
			}
		};

		// Добавляем слушатель события клика
		document.addEventListener('mousedown', handleClickOutside);

		// Убираем слушатель при размонтировании компонента
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleToggle]);

	return (
		<>
			<ArrowButton open={isOpen} onToggle={handleToggle} />
			<aside
				ref={containerRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase={true}
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>

					<Select
						options={fontFamilyOptions}
						placeholder='Шрифт'
						selected={selectArticleState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						title='Шрифт'
					/>

					<RadioGroup
						name='fontWeightOption'
						options={fontSizeOptions}
						selected={selectArticleState.fontSizeOption}
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>

					<Select
						options={fontColors}
						placeholder='Цвет шрифта'
						selected={selectArticleState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						placeholder='Цвет фона'
						selected={selectArticleState.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder='Ширина контента'
						selected={selectArticleState.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
