"use client"

import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Heart, Eye, Send } from "lucide-react"

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [user, setUser] = useState(null)
  const [comment, setComment] = useState("")
  const [commentLoading, setCommentLoading] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)

  // Fetch user (for comments/likes)
  useEffect(() => {
    let unsubscribe = null
    ;(async () => {
      if (typeof window !== "undefined") {
        let firebaseModule = await import("firebase/compat/app")
        firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
        await import("firebase/compat/auth")
        const firebaseAuth = firebaseModule.auth()
        unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
          setUser(firebaseUser)
        })
      }
    })()
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [])

  // Fetch all blogs
  useEffect(() => {
    let unsubscribe
    ;(async () => {
      setLoading(true)
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      unsubscribe = db
        .collection("blogs")
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (snapshot) => {
            const blogList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            setBlogs(blogList)
            setLoading(false)
          },
          (err) => {
            toast.error("Failed to fetch blogs: " + err.message)
            setLoading(false)
          }
        )
    })()
    return () => unsubscribe && unsubscribe()
  }, [])

  // Open blog and increment view
  const openBlog = async (blog) => {
    setSelectedBlog(blog)
    if (!user) return // Only track views for logged-in users
    try {
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      const blogRef = db.collection("blogs").doc(blog.id)
      const blogDoc = await blogRef.get()
      const data = blogDoc.data()
      const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD
      const viewsByUser = data.viewsByUser || {}
      if (viewsByUser[user.uid] !== today) {
        // Increment view and update viewsByUser
        await blogRef.update({
          views: (data.views || 0) + 1,
          [`viewsByUser.${user.uid}`]: today,
        })
        setSelectedBlog({ ...blog, views: (data.views || 0) + 1, viewsByUser: { ...viewsByUser, [user.uid]: today } })
      } else {
        setSelectedBlog({ ...blog, viewsByUser })
      }
    } catch (err) {
      toast.error("Failed to increment view: " + err.message)
    }
  }

  // Add comment
  const handleAddComment = async () => {
    if (!user) {
      toast.error("You must be logged in to comment.")
      return
    }
    if (!comment.trim()) return
    setCommentLoading(true)
    try {
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      const blogRef = db.collection("blogs").doc(selectedBlog.id)
      await blogRef.update({
        comments: [
          ...(selectedBlog.comments || []),
          {
            author: user.displayName || user.email,
            authorId: user.uid,
            text: comment,
            createdAt: new Date(),
          },
        ],
      })
      setSelectedBlog({
        ...selectedBlog,
        comments: [
          ...(selectedBlog.comments || []),
          {
            author: user.displayName || user.email,
            authorId: user.uid,
            text: comment,
            createdAt: new Date(),
          },
        ],
      })
      setComment("")
      toast.success("Comment added!")
    } catch (err) {
      toast.error("Failed to add comment: " + err.message)
    }
    setCommentLoading(false)
  }

  // Like blog
  const handleLike = async () => {
    if (!user) {
      toast.error("You must be logged in to like.")
      return
    }
    if (selectedBlog.likesByUser && selectedBlog.likesByUser[user.uid]) {
      toast.info("You have already liked this blog.")
      return
    }
    setLikeLoading(true)
    try {
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      const blogRef = db.collection("blogs").doc(selectedBlog.id)
      const blogDoc = await blogRef.get()
      const data = blogDoc.data()
      const likesByUser = data.likesByUser || {}
      if (!likesByUser[user.uid]) {
        await blogRef.update({
          likes: (data.likes || 0) + 1,
          [`likesByUser.${user.uid}`]: true,
        })
        setSelectedBlog({
          ...selectedBlog,
          likes: (data.likes || 0) + 1,
          likesByUser: { ...likesByUser, [user.uid]: true },
        })
        toast.success("You liked this blog!")
      } else {
        toast.info("You have already liked this blog.")
      }
    } catch (err) {
      toast.error("Failed to like blog: " + err.message)
    }
    setLikeLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-950 text-white py-10 px-4">
      <ToastContainer />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-emerald-400">Blogs</h1>
        {loading ? (
          <div className="flex items-center space-x-2 text-gray-300">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
            <span>Loading blogs...</span>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-gray-400">No blogs found.</div>
        ) : (
          <div className="space-y-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-gray-900/80 border border-gray-700 rounded-lg p-6 shadow cursor-pointer hover:bg-gray-900"
                onClick={() => openBlog(blog)}
              >
                <h2 className="text-xl font-bold text-emerald-300">{blog.title}</h2>
                <p className="text-gray-300 mt-2">
                  {blog.content.length > 120
                    ? blog.content.slice(0, 120) + "..."
                    : blog.content}
                </p>
                <div className="flex gap-6 mt-4 text-sm text-gray-400 items-center">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" /> {blog.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" /> {blog.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" /> {blog.comments?.length || 0}
                  </span>
                  <span>
                    {blog.createdAt?.toDate
                      ? blog.createdAt.toDate().toLocaleString()
                      : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Blog Modal/Detail */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
            <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl max-w-2xl w-full p-8 relative">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setSelectedBlog(null)}
              >
                ✕
              </button>
              <h2 className="text-2xl font-bold text-emerald-400 mb-2">{selectedBlog.title}</h2>
              <div className="text-gray-200 mb-4">{selectedBlog.content}</div>
              <div className="flex gap-6 mb-4 text-sm text-gray-400 items-center">
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" /> {selectedBlog.views || 0}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4" /> {selectedBlog.likes || 0}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-4 w-4" /> {selectedBlog.comments?.length || 0}
                </span>
                <span>
                  {selectedBlog.createdAt?.toDate
                    ? selectedBlog.createdAt.toDate().toLocaleString()
                    : ""}
                </span>
              </div>
              <div className="flex gap-3 mb-6">
                <Button
                  onClick={handleLike}
                  disabled={likeLoading || (selectedBlog.likesByUser && selectedBlog.likesByUser[user?.uid])}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  {likeLoading
                    ? "Liking..."
                    : (selectedBlog.likesByUser && selectedBlog.likesByUser[user?.uid])
                      ? "Liked"
                      : "Like"}
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Comments</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto mb-4">
                  {selectedBlog.comments && selectedBlog.comments.length > 0 ? (
                    selectedBlog.comments.map((c, idx) => (
                      <div key={idx} className="bg-gray-800 rounded p-3">
                        <div className="text-sm text-emerald-400 font-semibold">{c.author}</div>
                        <div className="text-gray-200">{c.text}</div>
                        <div className="text-xs text-gray-400">
                          {c.createdAt?.toDate
                            ? c.createdAt.toDate().toLocaleString()
                            : ""}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-400">No comments yet.</div>
                  )}
                </div>
                {user ? (
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-gray-800 text-white border-gray-700"
                    />
                    <Button
                      onClick={handleAddComment}
                      disabled={commentLoading}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                    >
                      <Send className="h-4 w-4" />
                      {commentLoading ? "Posting..." : "Post"}
                    </Button>
                  </div>
                ) : (
                  <div className="text-gray-400 mt-2">Login to add a comment.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}