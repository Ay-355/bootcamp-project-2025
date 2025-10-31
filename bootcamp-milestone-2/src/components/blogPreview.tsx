import style from "./blogPreview.module.css";
import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/app/blogData";

export default function BlogPreview(props: Blog) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.date}</p>
            <p>{props.description}</p>
            <Image
                src={props.image}
                alt={props.imageAlt}
                height="200"
                width="300"
            />

            <Link href={`/blogs/${props.slug}.html`}>LEARN MORE</Link>
        </div>
    );
}
