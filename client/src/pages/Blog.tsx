import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Link } from "wouter";

export function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["/api/blogs"],
  });

  const filteredPosts = blogPosts?.filter((post: any) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-primary bg-clip-text text-transparent">
            Cybersecurity Blog
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Insights, tutorials, and analysis on penetration testing, vulnerability research, and cybersecurity best practices.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading articles...</p>
          </div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredPosts.length === 0 ? (
              <motion.div variants={itemVariants} className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">
                  {searchTerm ? "No articles found matching your search." : "No blog posts available yet."}
                </p>
                {searchTerm && (
                  <Button
                    variant="outline"
                    onClick={() => setSearchTerm("")}
                    className="mt-4"
                  >
                    Clear Search
                  </Button>
                )}
              </motion.div>
            ) : (
              filteredPosts.map((post: any) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="cyber-card h-full group hover:scale-[1.02] transition-all duration-300">
                    {post.coverImageUrl && (
                      <div className="aspect-video overflow-hidden rounded-t-lg">
                        <img
                          src={post.coverImageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    <CardHeader>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        {post.readTime && (
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.readTime}
                          </div>
                        )}
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      {post.excerpt && (
                        <p className="text-muted-foreground mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{post.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                      
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                          Read More
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {/* Featured Categories */}
        {!isLoading && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {["Penetration Testing", "Vulnerability Research", "Network Security", "Web Security", "CTF Writeups", "Security Tools"].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  onClick={() => setSearchTerm(topic)}
                  className="neon-border hover:bg-primary/10"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}