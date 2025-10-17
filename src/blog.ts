type Blog = {
    title: string;
    date: string;
    description: string;
    image: string;
    imageAlt: string;
    slug: string;
};

const blogs: Blog[] = [
    {
        title: "Why are morning classes a thing?",
        date: "10-15-2025",
        description: "Anything before 11 AM is too early",
        image: "https://www.shutterstock.com/image-photo/digital-alarm-clock-sits-on-600nw-2646552147.jpg",
        imageAlt: "Blog 1",
        slug: "blog-1",
    },
    {
        title: "Blog 2",
        date: "10-16-2025",
        description: "This is the description of blog 2",
        image: "../img/random_img.jpg",
        imageAlt: "Blog 2",
        slug: "blog-2",
    },
];

const blogContainer = document.getElementById("blog-container");

blogs.forEach((blog) => {
    const div = document.createElement("div");

    const h1 = document.createElement("h1");
    h1.textContent = blog.title;

    const img = document.createElement("img");
    img.src = blog.image;
    img.alt = blog.imageAlt;
    img.style.height = "200px";
    img.style.width = "300px";


    const p = document.createElement("p");
    p.textContent = blog.description;

    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(p);

    blogContainer?.appendChild(div);

    div.addEventListener("click", () => {
        window.location.href = `../blogs/${blog.slug}.html`;
    });
});
