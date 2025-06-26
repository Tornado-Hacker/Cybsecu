import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { authenticateToken, login, hashPassword, type AuthRequest } from "./auth";
import {
  insertPortfolioContentSchema,
  insertSkillSchema,
  insertProjectSchema,
  insertExperienceSchema,
  insertBlogPostSchema,
  insertContactInfoSchema,
  updatePasswordSchema,
} from "@shared/schema";

export function registerRoutes(app: Express): Server {
  // Public routes - Portfolio data
  app.get("/api/portfolio/:section", async (req, res) => {
    try {
      const content = await storage.getPortfolioContent(req.params.section);
      res.json(content);
    } catch (error) {
      console.error("Error fetching portfolio content:", error);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.get("/api/skills", async (req, res) => {
    try {
      const category = req.query.category as string;
      const skills = category 
        ? await storage.getSkillsByCategory(category)
        : await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const featured = req.query.featured === "true";
      const projects = featured 
        ? await storage.getFeaturedProjects()
        : await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(parseInt(req.params.id));
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.get("/api/experiences", async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching experiences:", error);
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const contact = await storage.getContactInfo();
      res.json(contact);
    } catch (error) {
      console.error("Error fetching contact info:", error);
      res.status(500).json({ message: "Failed to fetch contact info" });
    }
  });

  // Public blog routes
  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getPublicBlogPosts();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const blog = await storage.getBlogPostBySlug(req.params.slug);
      if (!blog || !blog.isPublic) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  // Auth routes
  app.post("/api/auth/login", login);

  // Admin routes (protected)
  app.use("/api/admin", authenticateToken);

  // Admin - Portfolio content management
  app.get("/api/admin/portfolio", async (req, res) => {
    try {
      const content = await storage.getAllPortfolioContent();
      res.json(content);
    } catch (error) {
      console.error("Error fetching admin portfolio content:", error);
      res.status(500).json({ message: "Failed to fetch content" });
    }
  });

  app.post("/api/admin/portfolio", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertPortfolioContentSchema.parse(req.body);
      const content = await storage.upsertPortfolioContent(validatedData);
      res.json(content);
    } catch (error) {
      console.error("Error updating portfolio content:", error);
      res.status(400).json({ message: "Failed to update content" });
    }
  });

  // Admin - Skills management
  app.get("/api/admin/skills", async (req, res) => {
    try {
      const skills = await storage.getAllSkills();
      res.json(skills);
    } catch (error) {
      console.error("Error fetching admin skills:", error);
      res.status(500).json({ message: "Failed to fetch skills" });
    }
  });

  app.post("/api/admin/skills", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(validatedData);
      res.json(skill);
    } catch (error) {
      console.error("Error creating skill:", error);
      res.status(400).json({ message: "Failed to create skill" });
    }
  });

  app.put("/api/admin/skills/:id", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(parseInt(req.params.id), validatedData);
      res.json(skill);
    } catch (error) {
      console.error("Error updating skill:", error);
      res.status(400).json({ message: "Failed to update skill" });
    }
  });

  app.delete("/api/admin/skills/:id", async (req: AuthRequest, res) => {
    try {
      await storage.deleteSkill(parseInt(req.params.id));
      res.json({ message: "Skill deleted successfully" });
    } catch (error) {
      console.error("Error deleting skill:", error);
      res.status(400).json({ message: "Failed to delete skill" });
    }
  });

  // Admin - Projects management
  app.get("/api/admin/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching admin projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post("/api/admin/projects", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(400).json({ message: "Failed to create project" });
    }
  });

  app.put("/api/admin/projects/:id", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(parseInt(req.params.id), validatedData);
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(400).json({ message: "Failed to update project" });
    }
  });

  app.delete("/api/admin/projects/:id", async (req: AuthRequest, res) => {
    try {
      await storage.deleteProject(parseInt(req.params.id));
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(400).json({ message: "Failed to delete project" });
    }
  });

  // Admin - Experience management
  app.get("/api/admin/experiences", async (req, res) => {
    try {
      const experiences = await storage.getAllExperiences();
      res.json(experiences);
    } catch (error) {
      console.error("Error fetching admin experiences:", error);
      res.status(500).json({ message: "Failed to fetch experiences" });
    }
  });

  app.post("/api/admin/experiences", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertExperienceSchema.parse(req.body);
      const experience = await storage.createExperience(validatedData);
      res.json(experience);
    } catch (error) {
      console.error("Error creating experience:", error);
      res.status(400).json({ message: "Failed to create experience" });
    }
  });

  app.put("/api/admin/experiences/:id", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertExperienceSchema.partial().parse(req.body);
      const experience = await storage.updateExperience(parseInt(req.params.id), validatedData);
      res.json(experience);
    } catch (error) {
      console.error("Error updating experience:", error);
      res.status(400).json({ message: "Failed to update experience" });
    }
  });

  app.delete("/api/admin/experiences/:id", async (req: AuthRequest, res) => {
    try {
      await storage.deleteExperience(parseInt(req.params.id));
      res.json({ message: "Experience deleted successfully" });
    } catch (error) {
      console.error("Error deleting experience:", error);
      res.status(400).json({ message: "Failed to delete experience" });
    }
  });

  // Admin - Blog management
  app.get("/api/admin/blogs", async (req, res) => {
    try {
      const blogs = await storage.getAllBlogPosts();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching admin blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.get("/api/admin/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlogPost(parseInt(req.params.id));
      if (!blog) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error fetching admin blog:", error);
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  app.post("/api/admin/blogs", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertBlogPostSchema.parse(req.body);
      const blog = await storage.createBlogPost(validatedData);
      res.json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(400).json({ message: "Failed to create blog" });
    }
  });

  app.put("/api/admin/blogs/:id", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertBlogPostSchema.partial().parse(req.body);
      const blog = await storage.updateBlogPost(parseInt(req.params.id), validatedData);
      res.json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(400).json({ message: "Failed to update blog" });
    }
  });

  app.delete("/api/admin/blogs/:id", async (req: AuthRequest, res) => {
    try {
      await storage.deleteBlogPost(parseInt(req.params.id));
      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(400).json({ message: "Failed to delete blog" });
    }
  });

  // Admin - Contact info management
  app.get("/api/admin/contact", async (req, res) => {
    try {
      const contact = await storage.getContactInfo();
      res.json(contact);
    } catch (error) {
      console.error("Error fetching admin contact:", error);
      res.status(500).json({ message: "Failed to fetch contact info" });
    }
  });

  app.post("/api/admin/contact", async (req: AuthRequest, res) => {
    try {
      const validatedData = insertContactInfoSchema.parse(req.body);
      const contact = await storage.upsertContactInfo(validatedData);
      res.json(contact);
    } catch (error) {
      console.error("Error updating contact info:", error);
      res.status(400).json({ message: "Failed to update contact info" });
    }
  });

  // Admin - Password management
  app.put("/api/admin/credentials", async (req: AuthRequest, res) => {
    try {
      const validatedData = updatePasswordSchema.parse(req.body);
      const hashedPassword = await hashPassword(validatedData.password);
      
      const updatedAdmin = await storage.updateAdminCredentials(
        req.adminId!,
        validatedData.username,
        hashedPassword
      );
      
      res.json({
        message: "Credentials updated successfully",
        admin: {
          id: updatedAdmin.id,
          username: updatedAdmin.username,
        },
      });
    } catch (error) {
      console.error("Error updating credentials:", error);
      res.status(400).json({ message: "Failed to update credentials" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}