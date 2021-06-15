import * as React from 'react'
import styles from '../styles.module.css'
import config from 'react-global-configuration';

interface Props {
  text: string
}

export const ExampleComponent = ({ text }: Props) => {
  return <div className={styles.test}>Example Component: {config.get('apiEndpoint')} {text}</div>
}
