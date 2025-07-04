import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { toast } from "react-toastify";

const MessageCircle = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
);

const ThumbsUp = () => (
  <svg
    className="h-3 w-3"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
    />
  </svg>
);

const Star = ({ filled = false, className = "" }) => (
  <svg
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
);

const User = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export default function CommentsSection() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newRole, setNewRole] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // Fetch comments from Firestore
  useEffect(() => {
    let unsubscribe;
    (async () => {
      setLoading(true);
      let firebaseModule = await import("firebase/compat/app");
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule;
      await import("firebase/compat/firestore");
      const db = firebaseModule.firestore();
      unsubscribe = db
        .collection("comments")
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (snapshot) => {
            setComments(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
            setLoading(false);
          },
          (err) => {
            toast.error("Failed to fetch comments: " + err.message);
            setLoading(false);
          }
        );
    })();
    return () => unsubscribe && unsubscribe();
  }, []);

  const handleSubmitComment = async () => {
    if (!newComment.trim() || !newAuthor.trim()) return;
    setPosting(true);
    try {
      let firebaseModule = await import("firebase/compat/app");
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule;
      await import("firebase/compat/firestore");
      const db = firebaseModule.firestore();
      await db.collection("comments").add({
        author: newAuthor,
        role: newRole || "EHS Professional",
        content: newComment,
        rating: rating,
        createdAt: new Date(),
      });
      setNewComment("");
      setNewAuthor("");
      setNewRole("");
      setRating(5);
      toast.success("Comment posted!");
    } catch (err) {
      toast.error("Failed to post comment: " + err.message);
    }
    setPosting(false);
  };

  const handleLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        filled={i < rating}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-5 bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4 bg-opacity-10 text-white border border-white border-opacity-20 px-4 py-2 rounded-full text-sm font-medium">
            <MessageCircle />
            <span className="ml-2 text-gray-100">Community Feedback</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4 drop-shadow-lg">
            What Our Members Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Join the conversation and share your experience
          </p>
        </div>

        {/* Add New Comment */}
        <div className="mb-8 bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-md">
          <div className="p-6 pb-4 border-b border-gray-700">
            <div className="flex items-center space-x-2 text-lg font-semibold text-gray-100 mb-4">
              <User />
              <span>Share Your Experience</span>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                placeholder="Your Role"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">Rating:</span>
              <div className="flex space-x-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setRating(i + 1)}
                    className="focus:outline-none"
                  >
                    <Star
                      filled={i < rating}
                      className={`h-5 w-5 ${
                        i < rating
                          ? "text-yellow-400"
                          : "text-gray-600 hover:text-yellow-400"
                      } transition-colors cursor-pointer`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <textarea
              placeholder="Share your experience with GEHSPO..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />

            <div className="flex justify-end">
              <button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || !newAuthor.trim() || posting}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-md font-medium transition-colors"
              >
                <Send />
                <span className="ml-2">{posting ? "Posting..." : "Post Comment"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Container - Fixed Height with Scroll */}
        <div className="bg-gray-900 bg-opacity-90 border border-gray-700 rounded-lg shadow-sm">
          <div className="max-h-96 overflow-y-scroll p-4 space-y-4 scrollbar scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading comments...</div>
            ) : comments.length === 0 ? (
              <div className="text-center py-8">
                <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-gray-100 mb-2">
                  No comments yet
                </h4>
                <p className="text-gray-400">
                  Be the first to share your experience!
                </p>
              </div>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-700 last:border-b-0 pb-4 last:pb-0"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-100 text-sm">
                            {comment.author}
                          </h4>
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-800 text-gray-200 border border-gray-700">
                            {comment.role}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {renderStars(comment.rating)}
                          </div>
                          <span className="text-xs text-gray-400">
                            {comment.createdAt?.toDate
                              ? comment.createdAt.toDate().toLocaleString()
                              : ""}
                          </span>
                        </div>
                      </div>

                      <p className="text-gray-300 text-sm leading-relaxed mb-2">
                        {comment.content}
                      </p>

                      <button
                        onClick={() => handleLike(comment.id)}
                        className="inline-flex items-center text-gray-400 hover:text-blue-400 text-xs px-2 py-1 rounded hover:bg-gray-800 transition-colors"
                      >
                        <ThumbsUp />
                        <span className="ml-1">{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {comments.length > 4 && (
            <div className="border-t border-gray-700 px-4 py-2 text-center">
              <span className="text-xs text-gray-400">
                Scroll to see more comments
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
