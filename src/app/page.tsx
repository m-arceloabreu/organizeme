import woman from '../../public/woman-tablet-left.png';
import styles from './page.module.scss';
import ImageBanner from '@/components/imageBanner/ImageBanner';
import Link from 'next/link';
export default async function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.banner}>
        <ImageBanner imageSrc={woman} imageAlt="Woman using tablet" />
        <div className={styles.bannerText}>
          <h1>Organize-me</h1>

            <p>Start today to plan the future you want to have!</p>
            <p>Let's organize you together!</p>
            <Link className={styles.ctaRegister} href="/auth/signUp">
              Sign up for free
            </Link>
        </div>
      </div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
    </div>
  );
}
