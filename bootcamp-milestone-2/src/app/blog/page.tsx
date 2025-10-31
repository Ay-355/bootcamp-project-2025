import blogs from "@/app/blogData";
import BlogPreview from "@/components/blogPreview";

export default function Blog() {
    return (
        <main>
            <h1 className="page-title">Blog</h1>
            <div className="blog-container">
                {blogs.map((blog) => (
                    <BlogPreview key={blog.slug} {...blog}/>
                ))}
            </div>
        </main>
    );
}
