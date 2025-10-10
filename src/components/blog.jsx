import React, { useState, useEffect } from 'react';
export function Blog() {
  const { user, accessToken } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: '',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/blog', {}, accessToken || undefined);
      setPosts(data || []);
    } catch (error) {
      console.error('Failed to load blog posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('You must be signed in to create a blog post');
      return;
    }

    try {
      await apiRequest('/blog', {
        method: 'POST',
        body: JSON.stringify(formData),
      }, accessToken || undefined);

      toast.success('Blog post created successfully!');
      setFormData({ title: '', content: '', imageUrl: '' });
      setShowDialog(false);
      await loadPosts();
    } catch (error) {
      console.error('Failed to create blog post:', error);
      toast.error(error.message || 'Failed to create blog post');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        
          <h1 className="text-3xl mb-2">Gadget Blog</h1>
          <p className="text-gray-600">Reviews, news, and insights from the community</p>
        </div>
        {user && (
          <Button onClick={() => setShowDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Write Post
          </Button>
        )}
      </div>

      {/* Blog Posts */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-600">Loading posts...</div>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16">
          <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 mb-4">No blog posts yet</p>
          {user && (
            <Button onClick={() => setShowDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Write the First Post
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map(post => (
            <Card key={post.id}>
              {post.imageUrl && (
                <ImageWithFallback
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-64 object-cover"
                />
              )}
              
                <CardTitle className="text-2xl">{post.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.authorName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </CardDescription>
              </CardHeader>
              
                <div className="prose max-w-none">
                  {post.content.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Post Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          Write a Blog Post</DialogTitle>
            
              Share your thoughts, reviews, or tech insights with the community
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="My Amazing Gadget Review"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your blog post content here..."
                  rows={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Cover Image URL (optional)</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Publish Post
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
