import arrow from 'src/images/arrow.svg';
import clsx from 'clsx';
import styles from './ArrowButton.module.scss';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	/** Флаг открытия/закрытия формы */
	open: boolean;
	/** Функция для обработки открытия/закрытия формы */
	onToggle: OnClick;
};

export const ArrowButton = ({ open, onToggle }: ArrowButtonProps) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: open,
			})}
			onClick={onToggle}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, {
					[styles.arrow_open]: open,
					[styles.arrow]: !open,
				})}
			/>
		</div>
	);
};
