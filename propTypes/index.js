import PropTypes from 'prop-types';

export const navigationType = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        goBack: PropTypes.func.isRequired
    })
};