type Parent = string | null;

type User = {
	username: string;
};

export type Comment = {
	id: string;
	commentId: Parent;
	body: string;
	createdAt: Date;
	user: User;
};

export type CommentTree = Comment & {
	replies?: Array<Comment>;
};

export const buildCommentTree = (
	comments: Array<Comment>,
	parentId: Parent = null
): Array<CommentTree> => {
	comments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

	const commentTree = [];

	for (const comment of comments) {
		if (comment.commentId === parentId) {
			const replies = buildCommentTree(comments, comment.id);
			if (replies.length) {
				const commentWithReplies = { ...comment, replies };
				commentTree.push(commentWithReplies);
			} else {
				commentTree.push(comment);
			}
		}
	}

	return commentTree;
};
