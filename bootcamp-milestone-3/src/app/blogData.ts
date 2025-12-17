export interface Blog {
    title: string;
    date: string;
    description: string;
    image: string;
    imageAlt: string;
    slug: string;
}

const blogs: Blog[] = [
    {
        title: "Why are morning classes a thing?",
        date: "10/15/2025",
        description: "Anything before 11 AM is too early",
        image: "https://www.shutterstock.com/image-photo/digital-alarm-clock-sits-on-600nw-2646552147.jpg",
        imageAlt: "Blog 1",
        slug: "blog-1",
    },
    {
        title: "Blog 2",
        date: "10/16/2025",
        description: "This is the description of blog 2",
        image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Black.png",
        imageAlt: "Blog 2",
        slug: "blog-2",
    },
];

export default blogs;
