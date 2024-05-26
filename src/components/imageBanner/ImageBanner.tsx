import Image, { StaticImageData } from 'next/image';
import styles from './imageBanner.module.scss';

type ImageBannerProps = {
    imageSrc: string | StaticImageData;
    imageAlt: string;

}
export default function ImageBanner (props: ImageBannerProps){

    return (
        <div className={styles.mainImage}>
            <Image src={props.imageSrc} alt={props.imageAlt}>
        </Image>
        </div>
    );

}