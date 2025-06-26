import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Shield, Target, Lock, Search, ChevronDown, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Link } from "wouter";

export function Home() {
  const { data: heroContent } = useQuery({
    queryKey: ["/api/portfolio/hero"],
  });

  const { data: aboutContent } = useQuery({
    queryKey: ["/api/portfolio/about"],
  });

  const { data: featuredProjects } = useQuery({
    queryKey: ["/api/projects?featured=true"],
  });

  const { data: contact } = useQuery({
    queryKey: ["/api/contact"],
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-blue-950/20" />
        
        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <Shield className="h-20 w-20 text-primary mx-auto mb-6 terminal-glow" />
          </motion.div>
          
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-primary bg-clip-text text-transparent"
          >
            {heroContent?.title || "Cybersecurity Penetration Tester"}
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-8 typing-animation"
          >
            {heroContent?.subtitle || "Securing Digital Assets Through Ethical Hacking"}
          </motion.p>
          
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            {heroContent?.content || "Aspiring penetration tester specializing in identifying vulnerabilities and strengthening security postures for organizations."}
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/projects">
              <Button size="lg" className="cyber-gradient text-white border-0 hover:scale-105 transition-transform">
                <Target className="mr-2 h-5 w-5" />
                View My Work
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="neon-border hover:bg-primary/10">
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-6 w-6 text-primary opacity-70" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              {aboutContent?.title || "About Me"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {aboutContent?.content || "I am an aspiring penetration tester with a passion for cybersecurity and ethical hacking."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Security Focus",
                description: "Specialized in identifying and mitigating security vulnerabilities across web applications and network infrastructures.",
              },
              {
                icon: Search,
                title: "Vulnerability Research",
                description: "Experienced in conducting thorough security assessments using industry-standard tools and methodologies.",
              },
              {
                icon: Lock,
                title: "Ethical Approach",
                description: "Committed to responsible disclosure and helping organizations strengthen their security posture.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="cyber-card h-full">
                  <CardHeader className="text-center">
                    <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects && featuredProjects.length > 0 && (
        <section className="py-20 px-6 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-6 text-foreground">Featured Projects</h2>
              <p className="text-xl text-muted-foreground">
                Showcasing my hands-on experience in cybersecurity assessments and implementations.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 3).map((project: any, index: number) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="cyber-card h-full group cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {project.shortDescription || project.description}
                      </p>
                      {project.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech: string) => (
                            <span key={tech} className="project-tech-tag">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        {project.demoUrl && (
                          <Button size="sm" variant="outline">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button size="sm" variant="outline">
                            <Github className="h-4 w-4 mr-1" />
                            Code
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/projects">
                <Button variant="outline" size="lg" className="neon-border">
                  View All Projects
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 text-foreground">Ready to Secure Your Assets?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's discuss how I can help strengthen your organization's security posture through comprehensive penetration testing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact">
                <Button size="lg" className="cyber-gradient text-white">
                  <Mail className="mr-2 h-5 w-5" />
                  Start a Conversation
                </Button>
              </Link>
              
              <div className="flex space-x-4">
                {contact?.linkedin && (
                  <Button variant="ghost" size="sm">
                    <Linkedin className="h-5 w-5" />
                  </Button>
                )}
                {contact?.github && (
                  <Button variant="ghost" size="sm">
                    <Github className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}