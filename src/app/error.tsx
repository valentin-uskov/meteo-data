'use client'

import styles from './page.module.scss'
const ErrorWrapper = ({ error }: { error: Error }) => {
  return (
    <div className={styles.error}>
      <h2>Error! {error.message}</h2>
    </div>
  )
}
export default ErrorWrapper
