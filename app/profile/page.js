"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { User, Mail, Shield, PenTool, CheckCircle, LogOut, Settings } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [blogTitle, setBlogTitle] = useState("")
  const [blogContent, setBlogContent] = useState("")
  const [blogSuccess, setBlogSuccess] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [blogsLoading, setBlogsLoading] = useState(true)
  const [editingBlogId, setEditingBlogId] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  useEffect(() => {
    let unsubscribe = null
    let firebaseApp = null
    let firebaseAuth = null
    ;(async () => {
      if (typeof window !== "undefined") {
        let firebaseModule = await import("firebase/compat/app")
        firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
        await import("firebase/compat/auth")
        if (!firebaseModule.apps.length) {
          firebaseModule.initializeApp({
            apiKey: "AIzaSyCSrVIWadg4QFvU1pShX17bsrYD6N_aV2E",
            authDomain: "gehspo-work.firebaseapp.com",
            projectId: "gehspo-work",
            appId: "1:542875410734:web:11d0bcaa55d805dc419abf",
          })
        }
        firebaseApp = firebaseModule
        firebaseAuth = firebaseModule.auth()
        unsubscribe = firebaseAuth.onAuthStateChanged((firebaseUser) => {
          setUser(firebaseUser)
          setLoading(false)
          if (!firebaseUser) {
            router.replace("/auth")
          }
        })
      }
    })()
    return () => {
      if (unsubscribe) unsubscribe()
    }
  }, [router])

  // Fetch blogs for this user
  useEffect(() => {
    if (!user) return
    let unsubscribe
    ;(async () => {
      setBlogsLoading(true)
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      unsubscribe = db
        .collection("blogs")
        .where("authorId", "==", user.uid)
        .orderBy("createdAt", "desc")
        .onSnapshot(
          (snapshot) => {
            const blogList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            setBlogs(blogList)
            setBlogsLoading(false)
          },
          (err) => {
            toast.error("Failed to fetch blogs: " + err.message)
            setBlogsLoading(false)
          }
        )
    })()
    return () => unsubscribe && unsubscribe()
  }, [user])

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    if (!user) return;
    try {
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore();
      await db.collection("blogs").add({
        title: blogTitle,
        content: blogContent,
        authorId: user.uid,
        authorName: user.displayName || user.email,
        createdAt: new Date(),
        views: 0,
        likes: 0,
        comments: [],
      });
      setBlogSuccess(true)
      setBlogTitle("")
      setBlogContent("")
      toast.success("Blog post created!")
      setTimeout(() => setBlogSuccess(false), 3000)
    } catch (err) {
      setBlogSuccess(false)
      toast.error("Failed to create blog: " + err.message)
    }
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      await db.collection("blogs").doc(blogId).delete()
      toast.success("Blog deleted!")
    } catch (err) {
      toast.error("Failed to delete blog: " + err.message)
    }
  }

  const startEditBlog = (blog) => {
    setEditingBlogId(blog.id)
    setEditTitle(blog.title)
    setEditContent(blog.content)
  }

  const handleEditBlog = async (blogId) => {
    try {
      let firebaseModule = await import("firebase/compat/app")
      firebaseModule = firebaseModule.default ? firebaseModule.default : firebaseModule
      await import("firebase/compat/firestore")
      const db = firebaseModule.firestore()
      await db.collection("blogs").doc(blogId).update({
        title: editTitle,
        content: editContent,
      })
      setEditingBlogId(null)
      toast.success("Blog updated!")
    } catch (err) {
      toast.error("Failed to update blog: " + err.message)
    }
  }

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      const firebaseModule = await import("firebase/compat/app")
      const firebase = firebaseModule.default ? firebaseModule.default : firebaseModule
      await firebase.auth().signOut()
      router.replace("/auth")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-gray-950 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="text-gray-300 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-950 text-white">
      <ToastContainer />
      {/* Header */}
      <div className="bg-gray-900/95 border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                <p className="text-gray-300">Manage your profile and content</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-200 bg-gray-800 hover:bg-gray-700" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border border-gray-700 bg-gray-900/95 backdrop-blur-sm text-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-24 w-24 border-4 border-emerald-500 shadow-lg">
                    <AvatarImage src={user?.photoURL || "/placeholder.svg"} alt={user?.displayName || "User"} />
                    <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xl font-semibold">
                      {user?.displayName?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle className="text-xl text-white">{user?.displayName || "Welcome User"}</CardTitle>
                <CardDescription className="text-gray-400">Content Creator & Blogger</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <Mail className="h-5 w-5 text-emerald-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200">Email</p>
                      <p className="text-sm text-gray-400 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <Shield className="h-5 w-5 text-emerald-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200">User ID</p>
                      <p className="text-sm text-gray-400 font-mono truncate">{user?.uid}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <User className="h-5 w-5 text-emerald-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-200">Account Status</p>
                      <Badge variant="secondary" className="bg-emerald-900 text-emerald-300 border-emerald-700">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    </div>
                  </div>
                </div>
                <Separator className="bg-gray-700" />
              </CardContent>
            </Card>
          </div>

          {/* Blog Creation Form and Blog List */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border border-gray-700 bg-gray-900/95 backdrop-blur-sm text-white">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <PenTool className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-white">Create New Blog Post</CardTitle>
                    <CardDescription className="text-gray-400">Share your thoughts and ideas with the world</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {blogSuccess && (
                  <Alert className="mb-6 border-emerald-700 bg-emerald-900/80">
                    <CheckCircle className="h-4 w-4 text-emerald-400" />
                    <AlertDescription className="text-emerald-200">
                      Blog post created successfully!
                    </AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleBlogSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold text-gray-200">
                      Blog Title
                    </Label>
                    <Input
                      id="title"
                      type="text"
                      required
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      placeholder="Enter an engaging title for your blog post..."
                      className="h-12 border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-800 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content" className="text-sm font-semibold text-gray-200">
                      Content
                    </Label>
                    <Textarea
                      id="content"
                      required
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      placeholder="Write your blog content here. Share your insights, experiences, and knowledge..."
                      className="min-h-[200px] border-gray-700 focus:border-emerald-500 focus:ring-emerald-500 bg-gray-800 text-white resize-none"
                    />
                    <p className="text-xs text-gray-400">{blogContent.length} characters</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button
                      type="submit"
                      className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg flex items-center justify-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center">
                          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                          Posting...
                        </span>
                      ) : (
                        <>
                          <PenTool className="h-4 w-4 mr-2" />
                          Publish Blog Post
                        </>
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 border-gray-700 hover:bg-gray-800 bg-transparent text-gray-200"
                      onClick={() => {
                        setBlogTitle("")
                        setBlogContent("")
                      }}
                    >
                      Clear Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Blog List */}
            <div className="mt-10">
              <h2 className="text-xl font-bold mb-4 text-white">Your Blogs</h2>
              {blogsLoading ? (
                <div className="flex items-center space-x-2 text-gray-300">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
                  <span>Loading blogs...</span>
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-gray-400">You have not created any blogs yet.</div>
              ) : (
                <div className="space-y-6">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-gray-900/80 border border-gray-700 rounded-lg p-6 shadow">
                      {editingBlogId === blog.id ? (
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            handleEditBlog(blog.id);
                          }}
                          className="space-y-2"
                        >
                          <input
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
                            value={editTitle}
                            onChange={e => setEditTitle(e.target.value)}
                            required
                          />
                          <textarea
                            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2 min-h-[80px]"
                            value={editContent}
                            onChange={e => setEditContent(e.target.value)}
                            required
                          />
                          <div className="flex gap-2 mt-2">
                            <button type="submit" className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700">Save</button>
                            <button type="button" className="bg-gray-700 text-white px-4 py-2 rounded" onClick={() => setEditingBlogId(null)}>Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-emerald-400">{blog.title}</h3>
                            <div className="flex gap-2">
                              <button onClick={() => startEditBlog(blog)} className="text-blue-400 hover:underline">Edit</button>
                              <button onClick={() => handleDeleteBlog(blog.id)} className="text-red-400 hover:underline">Delete</button>
                            </div>
                          </div>
                          <div className="text-gray-300 mt-2">{blog.content}</div>
                          <div className="flex gap-4 mt-2 text-sm text-gray-400">
                            <span>Views: {blog.views}</span>
                            <span>Likes: {blog.likes}</span>
                            <span>Comments: {blog.comments?.length || 0}</span>
                            <span>{blog.createdAt?.toDate ? blog.createdAt.toDate().toLocaleString() : ""}</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
