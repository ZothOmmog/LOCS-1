import PropTypes from 'prop-types';

export const Loader = ({ isLoading, children }) => (
    isLoading ? (
        'Загрузка данных...'
        ) : (
        isLoading === null ? (
            'Загрузка данных ещё не началась'
        ) : children
    )
);

Loader.propTypes = {
    isLoading: PropTypes.bool,
    children: PropTypes.node
};