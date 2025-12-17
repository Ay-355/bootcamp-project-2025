import mongoose, { Schema } from "mongoose";

type Blog = {
    title: string;
    slug: string;
    date: Date;
    description: string;
    content: string;
    image: string;
    image_alt: string;
};

const blogSchema = new Schema<Blog>({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    date: { type: Date, required: false, default: new Date() },
    description: { type: String, required: true },
    image: { type: String, required: true },
    image_alt: { type: String, required: true },
    content: { type: String, required: true },
});

const Blog = mongoose.models["blogs"] || mongoose.model("blogs", blogSchema);

export default Blog;
