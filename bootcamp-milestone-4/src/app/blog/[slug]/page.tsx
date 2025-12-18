"use client";

import Blog from "@/database/blogSchema";
import { IComment } from "@/database/blogSchema";
import Comment from "@/components/comment";
import { useParams } from "next/navigation";
import { useEffect, useState, FormEvent } from "react";

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
        fetchBlog();
    }, [slug]);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!slug) return;
        if (!user.trim() || !comment.trim) {
            setError("User and comment are required.");
            return;
        }

        setPosting(true);
        setError(null);

        try {
            const res = await fetch(`/api/blogs/${slug}/comment`, {
                method: "POST",
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
        <main>
            <div>
                <h1 className="page-title">{blog.title}</h1>
                <p>{new Date(blog.date).toLocaleDateString("en-US")}</p>
                <p>{blog.description}</p>
                <p>{blog.content}</p>
            </div>
            <br />
            <div>
                <h3>Comments</h3>
                {blog.comments?.length > 0 ? (
                    blog.comments.map((comment: IComment, index: number) => (
                        <Comment key={index} comment={comment} />
                    ))
                ) : (
                    <p>No comments yet</p>
                )}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <textarea
                        placeholder="Comment here..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                    />
                    {error && (
                        <p style={{ color: "red", fontSize: "0.9rem" }}>
                            {error}
                        </p>
                    )}
                    <button type="submit" disabled={posting}>
                        {posting ? "Posting..." : "Post Comment"}
                    </button>
                </form>
            </div>
        </main>
    );
}
