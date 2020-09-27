import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.module.scss';

export const PopupWindowView = ({ children, onClickClose, windowClass }) => (
    <>
        <div 
            className={style['__shadow']}
            onClick={e => {
                if (e.target.classList.contains(style['__shadow'])) {
                    onClickClose();
                }
            }}
        >
        </div>
        <div
            className={classNames(
                style['window'],
                { [windowClass]: windowClass }
            )}
        >
            <div className={style['__inner-content']}>
                {children}
            </div>
        </div>
    </>
);

/**
 * Всплывающее окно.
 */
export const PopupWindow = ({ isOpen, setIsOpen, windowClass, children }) => {
    const onClickClose = () => setIsOpen(false);

    return isOpen ? (
        <PopupWindowView 
            onClickClose={onClickClose}
            windowClass={windowClass}
        >
            {children}
        </PopupWindowView>
    ) : null;
};

PopupWindow.propTypes = {
    children: PropTypes.element.isRequired,
    isOpen: PropTypes.bool.isRequired,
    windowClass: PropTypes.string
}