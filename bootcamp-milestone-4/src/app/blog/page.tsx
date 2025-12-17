import BlogPreview from "@/components/blogPreview";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

export default async function BlogPage() {
    async function getBlogs() {
        await connectDB();

        try {
            const blogs = await Blog.find().sort({ date: -1 }).orFail();
            return blogs;
        } catch (err) {
            return null;
        }
    }

    const blogs = await getBlogs();

    if (!blogs)
        return (
            <main>
                <h1 className="page-title">Blog</h1>
                <div className="blog-container">
                    <p>No blogs found</p>
                </div>
            </main>
        );

    return (
        <main>
            <h1 className="page-title">Blog</h1>
            <div className="blog-container">
                {blogs.map((blog) => (
                    <BlogPreview
                        key={blog.slug}
                        title={blog.title}
                        date={blog.date}
                        content={blog.content}
                        description={blog.description}
                        image={blog.image}
                        image_alt={blog.image_alt}
                        slug={blog.slug}
                        comments={blog.comments}
                    />
                ))}
            </div>
        </main>
    );
}

