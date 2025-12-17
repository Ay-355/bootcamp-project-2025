import { IComment } from "@/database/blogSchema";

type CommentProps = {
    comment: IComment;
};

function parseCommentTime(time: Date) {
    const date = new Date(time);
    return date.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
    });
}

function Comment({ comment }: CommentProps) {
    return (
        <div>
            <h4>{comment.user}</h4>
            <p>{comment.comment}</p>
            <span>{parseCommentTime(comment.time)}</span>
        </div>
    );
}

export default Comment;
