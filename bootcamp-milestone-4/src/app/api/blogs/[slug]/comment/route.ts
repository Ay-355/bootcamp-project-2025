import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/database/db";
import Blog from "@/database/blogSchema";

type IParams = {
    params: Promise<{ slug: string }>;
};

export async function POST(req: NextRequest, { params }: IParams) {
    await connectDB();

    try {
        const { slug } = await params;
        const data = await req.json();

        const { user, comment } = data;
        const time = new Date();

        if (!user || !comment) {
            return NextResponse.json(
                { message: "Both 'user' and 'comment' are required" },
                { status: 400 }
            );
        }

        const blog = await Blog.findOneAndUpdate(
            { slug },
            { $push: { comments: { user, comment, time } } },
            { new: true, runValidators: true }
        );

        if (!blog) {
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: "Comment added successfully",
                comment: { user, comment, time },
                comments: blog.comments,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error processing request" },
            { status: 500 }
        );
    }
}
