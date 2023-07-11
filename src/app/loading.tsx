import styles from './page.module.scss'
import BounceLoader from '@/components/BounceLoader'
const LoadingPage = () => {
  return (
    <div className={styles.loading}>
      <BounceLoader />
    </div>
  )
}

export default LoadingPage
