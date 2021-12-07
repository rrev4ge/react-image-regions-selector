import React from 'react'
import PropTypes from 'prop-types'
import styles from './Crop.module.scss'

export const DeleteIcon = (props) => (
    <div
        className={styles.rmcIconContainer}
        {...props}
    >
        <div className={styles.rmcRemove}/>
    </div>

)

export const NumberIcon = ({number}) => (
    <div className={styles.numberIcon}>
        {number}
    </div>
)

export const CropContent = ({content}) => (
    <div className={styles.cropContent}>
        {content}
    </div>
)

const {number, string} = PropTypes

NumberIcon.propTypes = {
    number: PropTypes.oneOfType([number, string]),
}

NumberIcon.defaultProps = {
    number: '',
}

