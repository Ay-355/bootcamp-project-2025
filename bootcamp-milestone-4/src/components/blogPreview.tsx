import styles from "./blogpreview.module.css";
import Image from "next/image";
import Link from "next/link";
import Blog from "@/database/blogSchema";

export default function BlogPreview(props: Blog) {
    return (
        <article className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={props.image}
                    alt={props.image_alt}
                    fill
                    className={styles.image}
                />
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>{props.title}</h2>
                <p className={styles.date}>
                    {props.date.toLocaleDateString("en-US")}
                </p>
                <p className={styles.description}>{props.description}</p>

                <Link href={`/blog/${props.slug}`} className={styles.link}>
                    Learn More →
                </Link>
            </div>
        </article>
    );
}
