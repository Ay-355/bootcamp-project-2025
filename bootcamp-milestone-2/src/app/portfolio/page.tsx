import Link from "next/link";
export default function Portfolio() {
    return (
        <main>
            <h1 className="page-title">Portfolio</h1>
            <div className="project">
                <Link href="/">
                    <img src="website-home.png" height="300" width="600" />
                </Link>
                <div className="project-details">
                    <p className="project-name">
                        <strong>Aryan's Personal Website</strong>
                    </p>
                    <p className="project-description">
                        A website that has some information about me.
                    </p>
                    <Link href="index.html">LEARN MORE</Link>
                </div>
            </div>
        </main>
    );
}
