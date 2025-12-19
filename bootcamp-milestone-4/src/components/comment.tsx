import { IComment } from "@/database/blogSchema";
import styles from "./comment.module.css";

type CommentProps = {
    comment: IComment;
};

function parseCommentTime(time: Date | string) {
    const date = new Date(time);
    return date.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
    });
}

function Comment({ comment }: CommentProps) {
    return (
        <div className={styles.comment}>
            <div className={styles.header}>
                <span className={styles.username}>{comment.user}</span>
                <span className={styles.date}>
                    {parseCommentTime(comment.time)}
                </span>
            </div>

            <p className={styles.body}>{comment.comment}</p>
        </div>
    );
}

export default Comment;
