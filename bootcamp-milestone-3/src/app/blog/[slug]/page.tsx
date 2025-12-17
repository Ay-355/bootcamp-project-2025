import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

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
                <h1 className="page-title">{blog.title}</h1>
                <p>{blog.description}</p>
                <p>{blog.content}</p>
            </main>
        );
    } catch (err) {
        console.log(err);
        return (
            <main>
                <h1 className="page-title">Blog not found.</h1>
            </main>
        );
    }
}

