import Link from "next/link";

export default function Resume() {
    return (
        <main>
            <h1 className="page-title">Resume</h1>
            <Link href="resume.pdf" download className="button">
                Download Resume
            </Link>
            <div className="resume">
                <section className="section">
                    <h2 className="section-title">Education</h2>
                    <div className="entry">
                        <h3 className="entry-title">
                            Bachelor of Science (B.S.) in Computer Science
                        </h3>
                        <p className="entry-info">
                            California Polytechnic State University, San Luis
                            Obispo | Expected Graduation May 2029
                        </p>
                    </div>
                </section>
                <section className="section">
                    <h2 className="section-title">Coursework</h2>
                    <ul className="course-list">
                        <li>Hack4Impact HTML, CSS, & Git Starter Pack</li>
                        <li>Data Structures & Algorithms</li>
                        <li>Calculus III</li>
                    </ul>
                </section>
                <section className="section">
                    <h2 className="section-title">Skills</h2>
                    <ul className="skill-list">
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>Git</li>
                        <li>Python</li>
                        <li>Java</li>
                        <li>Rust</li>
                        <li>Linux</li>
                        <li>C++</li>
                    </ul>
                </section>
                <section className="section">
                    <h2 className="section-title">Projects</h2>
                    <div className="entry">
                        <h3 className="entry-title">Personal Website</h3>
                        <p className="entry-info">
                            Basic Website using HTML & CSS
                        </p>
                        <p className="entry-description">
                            Made using the Hack4Impact HTML, CSS, & Git Starter
                            Pack
                        </p>
                    </div>
                </section>
                <section className="section">
                    <h2 className="section-title">Experience</h2>
                    <div className="entry">
                        <h3 className="entry-title">No Experience Yet</h3>
                        <p className="entry-info"></p>
                        <p className="entry-description"></p>
                    </div>
                </section>
            </div>
        </main>
    );
}
