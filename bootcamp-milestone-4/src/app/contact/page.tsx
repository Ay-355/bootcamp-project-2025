"use client";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        if (!name.trim() || !email.trim() || !message.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const res = await emailjs.send(
                "service_613ete8",
                "template_tpr6n5a",
                {
                    from_name: name,
                    from_email: email,
                    message: message,
                },
                "b4BquAOVhrWUt4s_T"
            );

            console.log("Email result:", res.text);

            setSuccess("Message sent successfully!");
            setName("");
            setEmail("");
            setMessage("");
        } catch (err) {
            console.error(err);
            setError("Failed to send message. Please try again later.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main style={{ alignItems: "center", marginTop: "2rem" }}>
            <h1>Contact Me</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    marginTop: "1rem",
                    width: "100%",
                    maxWidth: "500px",
                }}
            >
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ padding: "0.5rem" }}
                />

                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ padding: "0.5rem" }}
                />

                <textarea
                    placeholder="Your Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    style={{ padding: "0.5rem" }}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: "0.75rem", cursor: "pointer" }}
                >
                    {loading ? "Sending..." : "Send Message"}
                </button>
            </form>
        </main>
    );
}
