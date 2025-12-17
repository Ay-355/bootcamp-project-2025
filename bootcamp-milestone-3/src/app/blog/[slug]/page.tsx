import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";
import { IComment } from "@/database/blogSchema";
import Comment from "@/components/comment";

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function BlogPage({ params }: Props) {
    await connectDB();
    const { slug } = await params;
    try {
        const blog = await Blog.findOne({ slug }).orFail();
        return (
            <main>
                <div>
                    <h1 className="page-title">{blog.title}</h1>
                    <p>{blog.description}</p>
                    <p>{blog.content}</p>
                </div>
                <div>
                    <h3>Comments</h3>
                    {blog.comments && blog.comments.length > 0 ? (
                        blog.comments.map(
                            (comment: IComment, index: number) => (
                                <Comment key={index} comment={comment} />
                            )
                        )
                    ) : (
                        <p>No comments yet</p>
                    )}
                </div>
            </main>
        );
    } catch (err) {
        console.log(err);
        return (
            <main>
                <h1 className="page-title">Blog not found.</h1>
                <p>Please check the URL</p>
            </main>
        );
    }
}
