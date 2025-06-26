import { pgTable, text, varchar, boolean, timestamp, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Admin authentication table
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Portfolio content sections
export const portfolioContent = pgTable("portfolio_content", {
  id: serial("id").primaryKey(),
  section: varchar("section", { length: 100 }).notNull().unique(), // 'hero', 'about', 'contact', etc.
  title: text("title"),
  subtitle: text("subtitle"),
  content: text("content"),
  imageUrl: text("image_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Skills and certifications
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(), // 'technical', 'tools', 'certifications'
  name: varchar("name", { length: 200 }).notNull(),
  level: varchar("level", { length: 50 }), // 'beginner', 'intermediate', 'advanced', 'expert'
  description: text("description"),
  iconUrl: text("icon_url"),
  order: serial("order"),
});

// Projects/Case Studies
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  shortDescription: text("short_description"),
  technologies: text("technologies").array(), // Array of tech used
  imageUrl: text("image_url"),
  demoUrl: text("demo_url"),
  githubUrl: text("github_url"),
  status: varchar("status", { length: 50 }).default("completed"), // 'completed', 'in-progress', 'planned'
  featured: boolean("featured").default(false),
  order: serial("order"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Work Experience
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 200 }).notNull(),
  position: varchar("position", { length: 200 }).notNull(),
  location: varchar("location", { length: 100 }),
  startDate: varchar("start_date", { length: 20 }).notNull(), // "2023-01" format
  endDate: varchar("end_date", { length: 20 }), // null for current position
  description: text("description"),
  achievements: text("achievements").array(),
  technologies: text("technologies").array(),
  order: serial("order"),
});

// Blog posts
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 300 }).notNull(),
  slug: varchar("slug", { length: 300 }).notNull().unique(),
  excerpt: text("excerpt"),
  content: text("content").notNull(), // Rich text content
  coverImageUrl: text("cover_image_url"),
  tags: text("tags").array(),
  isPublic: boolean("is_public").default(false),
  readTime: varchar("read_time", { length: 20 }), // "5 min read"
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contact information
export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 200 }),
  phone: varchar("phone", { length: 50 }),
  location: varchar("location", { length: 200 }),
  linkedin: varchar("linkedin", { length: 300 }),
  github: varchar("github", { length: 300 }),
  twitter: varchar("twitter", { length: 300 }),
  website: varchar("website", { length: 300 }),
  resumeUrl: text("resume_url"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Zod schemas for validation
export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPortfolioContentSchema = createInsertSchema(portfolioContent).omit({
  id: true,
  updatedAt: true,
});

export const insertSkillSchema = createInsertSchema(skills).omit({
  id: true,
  order: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  order: true,
  createdAt: true,
});

export const insertExperienceSchema = createInsertSchema(experiences).omit({
  id: true,
  order: true,
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({
  id: true,
  updatedAt: true,
});

// Login schema
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Update password schema
export const updatePasswordSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Types
export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type PortfolioContent = typeof portfolioContent.$inferSelect;
export type InsertPortfolioContent = z.infer<typeof insertPortfolioContentSchema>;
export type Skill = typeof skills.$inferSelect;
export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Experience = typeof experiences.$inferSelect;
export type InsertExperience = z.infer<typeof insertExperienceSchema>;
export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type UpdatePasswordData = z.infer<typeof updatePasswordSchema>;