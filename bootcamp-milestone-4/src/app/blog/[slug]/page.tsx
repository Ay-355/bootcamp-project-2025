"use client";

import Blog from "@/database/blogSchema";
import { IComment } from "@/database/blogSchema";
import Comment from "@/components/comment";
import { useParams } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";
import styles from "./blogPage.module.css";
import Image from "next/image";

type Props = {
    params: Promise<{ slug: string }>;
};

export default function BlogPage({ params }: Props) {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [user, setUser] = useState("");
    const [comment, setComment] = useState("");
    const [posting, setPosting] = useState(false);

    useEffect(() => {
        async function fetchBlog() {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`/api/blogs/${slug}`);
                if (!response.ok) {
                    throw new Error("Blog not found.");
                }
                const blog = await response.json();
                setBlog(blog);
            } catch (err) {
                setError("Blog not found.");
            } finally {
                setLoading(false);
            }
        }
        if (slug) fetchBlog();
    }, [slug]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!slug) return;
        if (!user.trim() || !comment.trim()) {
            setError("User and comment are required.");
            return;
        }

        setPosting(true);
        setError(null);

        try {
            const res = await fetch(`/api/blogs/${slug}/comment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user, comment }),
            });
            if (!res.ok) {
                const data = await res.json().catch(() => null);
                throw new Error(data?.message || "Failed to post comment");
            }

            const refreshed = await fetch(`/api/blogs/${slug}`).then((r) =>
                r.json()
            );
            setBlog(refreshed);
            setUser("");
            setComment("");
        } catch (err) {
            setError("Comment not posted.");
        } finally {
            setPosting(false);
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error && !blog) return <p>{error}</p>;
    if (!blog) return <p>Blog not found.</p>;

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <article className={styles.article}>
                    <h1 className={styles.title}>{blog.title}</h1>
                    <p className={styles.meta}>
                        {new Date(blog.date).toLocaleDateString("en-US")}
                    </p>
                    {blog.image && (
                        <div className={styles.blogImageWrapper}>
                            <Image
                                src={blog.image}
                                alt={blog.image_alt || blog.title}
                                width={2200}
                                height={630}
                                className={styles.blogImage}
                                priority
                            />
                        </div>
                    )}

                    <p className={styles.description}>{blog.description}</p>
                    <div className={styles.content}>
                        <p>{blog.content}</p>
                    </div>
                </article>

                <section className={styles.commentsSection}>
                    <div className={styles.commentsHeader}>
                        <h3 className={styles.commentsTitle}>Comments</h3>
                        <span className={styles.commentsCount}>
                            {blog.comments?.length || 0}{" "}
                            {blog.comments?.length === 1
                                ? "comment"
                                : "comments"}
                        </span>
                    </div>

                    {blog.comments?.length ? (
                        <div className={styles.commentList}>
                            {blog.comments.map(
                                (comment: IComment, index: number) => (
                                    <Comment key={index} comment={comment} />
                                )
                            )}
                        </div>
                    ) : (
                        <p className={styles.noComments}>No comments yet</p>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <input
                            type="text"
                            placeholder="Username"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Comment here..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                            className={styles.textarea}
                        />
                        {error && <p className={styles.error}>{error}</p>}
                        <button
                            type="submit"
                            disabled={posting}
                            className={styles.button}
                        >
                            {posting ? "Posting..." : "Post Comment"}
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
}
