import style from "./blogPreview.module.css";
import Image from "next/image";
import Link from "next/link";
import Blog from "@/database/blogSchema";

export default function BlogPreview(props: Blog) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.date.toLocaleDateString("en-US")}</p>
            <p>{props.description}</p>
            <Image
                src={props.image}
                alt={props.image_alt}
                height="200"
                width="300"
            />

            <p><Link href={`/blogs/${props.slug}`}>LEARN MORE</Link></p>
        </div>
    );
}
