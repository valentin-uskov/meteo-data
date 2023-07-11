import { FC } from 'react'

import styles from './BounceLoader.module.scss'

const BounceLoader: FC = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.circle1}></div>
      <div className={styles.circle2}></div>
    </div>
  )
}

export default BounceLoader
