"use client"

import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Heart, Eye, Send, User, BookOpen, ArrowLeft, Share2, Bookmark } from "lucide-react"

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
          },
        )
    })()
    return () => unsubscribe && unsubscribe()
  }, [])

  // Open blog and increment view
  const openBlog = async (blog) => {
    setSelectedBlog(blog)
    if (!user) return

    try {
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      const blogRef = db.collection("blogs").doc(blog.id)
      const blogDoc = await blogRef.get()
      const data = blogDoc.data()
      const today = new Date().toISOString().slice(0, 10)
      const viewsByUser = data.viewsByUser || {}

      if (viewsByUser[user.uid] !== today) {
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

  const formatDate = (date) => {
    if (!date?.toDate) return ""
    return date.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getReadingTime = (content) => {
    const wordsPerMinute = 200
    const words = content.split(" ").length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min read`
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <ToastContainer
        position="top-right"
        theme="dark"
        toastClassName="!bg-slate-800 !text-white !border !border-slate-700"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Blog</h1>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              {blogs.length} {blogs.length === 1 ? "article" : "articles"}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-slate-400">Loading articles...</span>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No articles yet</h3>
            <p className="text-slate-400">Check back soon for new content.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {blogs.map((blog, index) => (
              <article
                key={blog.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  index === 0
                    ? "bg-gradient-to-r from-slate-900/50 to-slate-800/50 border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30"
                    : "bg-slate-900/30 border border-slate-800/50 rounded-xl p-6 hover:bg-slate-900/50 hover:border-slate-700"
                }`}
                onClick={() => openBlog(blog)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant="secondary"
                      className="bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20"
                    >
                      Article
                    </Badge>
                    <span className="text-xs text-slate-500">{getReadingTime(blog.content)}</span>
                  </div>
                  <time className="text-xs text-slate-500">{formatDate(blog.createdAt)}</time>
                </div>

                <h2
                  className={`font-bold text-white group-hover:text-blue-400 transition-colors mb-3 line-clamp-2 ${
                    index === 0 ? "text-2xl" : "text-xl"
                  }`}
                >
                  {blog.title}
                </h2>

                <p className="text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                  {blog.content.length > 200 ? blog.content.slice(0, 200) + "..." : blog.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-slate-400">
                    <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <Eye className="h-4 w-4" />
                      <span>{blog.views || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-red-400 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span>{blog.likes || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 hover:text-blue-400 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span>{blog.comments?.length || 0}</span>
                    </div>
                  </div>
                  <div className="text-blue-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more →
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Blog Modal */}
        {selectedBlog && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
            <div className="h-full overflow-y-auto">
              <div className="min-h-full bg-slate-950">
                {/* Modal Header */}
                <header className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800">
                  <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBlog(null)}
                        className="text-slate-400 hover:text-white hover:bg-slate-800 -ml-2"
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to articles
                      </Button>
                    </div>
                  </div>
                </header>

                {/* Article Content */}
                <article className="max-w-4xl mx-auto px-6 py-12">
                  {/* Article Header */}
                  <header className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Article</Badge>
                      <span className="text-sm text-slate-500">{getReadingTime(selectedBlog.content)}</span>
                      <span className="text-slate-600">•</span>
                      <time className="text-sm text-slate-500">{formatDate(selectedBlog.createdAt)}</time>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {selectedBlog.title}
                    </h1>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{selectedBlog.views || 0} views</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{selectedBlog.likes || 0} likes</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="h-4 w-4" />
                          <span>{selectedBlog.comments?.length || 0} comments</span>
                        </div>
                      </div>
                    </div>
                  </header>

                  {/* Article Body */}
                  <div className="prose prose-invert prose-lg max-w-none mb-12">
                    <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-lg">
                      {selectedBlog.content}
                    </div>
                  </div>

                  {/* Article Actions */}
                  <div className="flex items-center space-x-3 mb-12 pb-8 border-b border-slate-800">
                    <Button
                      onClick={handleLike}
                      disabled={likeLoading || (selectedBlog.likesByUser && selectedBlog.likesByUser[user?.uid])}
                      className={`${
                        selectedBlog.likesByUser && selectedBlog.likesByUser[user?.uid]
                          ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                          : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30"
                      } border transition-all duration-200`}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${
                          selectedBlog.likesByUser && selectedBlog.likesByUser[user?.uid] ? "fill-current" : ""
                        }`}
                      />
                      {likeLoading
                        ? "Liking..."
                        : selectedBlog.likesByUser && selectedBlog.likesByUser[user?.uid]
                          ? `Liked (${selectedBlog.likes || 0})`
                          : `Like (${selectedBlog.likes || 0})`}
                    </Button>
                  </div>

                  {/* Comments Section */}
                  <section>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Comments ({selectedBlog.comments?.length || 0})
                    </h3>

                    {/* Add Comment */}
                    {user ? (
                      <div className="mb-8">
                        <div className="flex space-x-3">
                          <Avatar className="h-10 w-10 border border-slate-700">
                            <AvatarFallback className="bg-slate-800 text-slate-300">
                              {user.displayName?.charAt(0)?.toUpperCase() ||
                                user.email?.charAt(0)?.toUpperCase() ||
                                "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Input
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Share your thoughts..."
                              className="bg-slate-900 border-slate-700 text-white placeholder-slate-500 focus:border-blue-500 mb-3"
                              onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleAddComment()}
                            />
                            <div className="flex justify-end">
                              <Button
                                onClick={handleAddComment}
                                disabled={commentLoading || !comment.trim()}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Send className="h-4 w-4 mr-2" />
                                {commentLoading ? "Posting..." : "Post"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 mb-8 bg-slate-900/50 border border-slate-800 rounded-lg">
                        <User className="h-8 w-8 mx-auto mb-2 text-slate-500" />
                        <p className="text-slate-400">Sign in to join the discussion</p>
                      </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-6">
                      {selectedBlog.comments && selectedBlog.comments.length > 0 ? (
                        selectedBlog.comments.map((c, idx) => (
                          <div key={idx} className="flex space-x-3">
                            <Avatar className="h-10 w-10 border border-slate-700">
                              <AvatarFallback className="bg-slate-800 text-slate-300">
                                {c.author?.charAt(0)?.toUpperCase() || "U"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className="font-medium text-white">{c.author}</span>
                                <span className="text-xs text-slate-500">
                                  {c.createdAt?.toDate ? c.createdAt.toDate().toLocaleString() : ""}
                                </span>
                              </div>
                              <p className="text-slate-300 leading-relaxed">{c.text}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12">
                          <MessageCircle className="h-12 w-12 mx-auto mb-3 text-slate-600" />
                          <p className="text-slate-400">No comments yet</p>
                          <p className="text-slate-500 text-sm">Be the first to share your thoughts</p>
                        </div>
                      )}
                    </div>
                  </section>
                </article>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
