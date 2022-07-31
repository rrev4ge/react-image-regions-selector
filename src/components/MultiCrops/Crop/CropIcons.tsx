import React from 'react';
import styles from './Crop.module.scss';

export const CropDeleteIcon = (props) => (
  <div className={styles.rmcIconContainer} {...props}>
    <div className={styles.rmcRemove} />
  </div>
);

export const CropNumberIcon = ({
  number = '',
}: {
  number: number | string;
}) => <div className={styles.numberIcon}>{number}</div>;

export const CropContent = ({ content }) => (
  <div className={styles.cropContent}>{content}</div>
);
