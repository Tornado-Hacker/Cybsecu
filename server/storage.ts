import {
  Admin,
  InsertAdmin,
  PortfolioContent,
  InsertPortfolioContent,
  Skill,
  InsertSkill,
  Project,
  InsertProject,
  Experience,
  InsertExperience,
  BlogPost,
  InsertBlogPost,
  ContactInfo,
  InsertContactInfo,
} from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // Admin operations
  getAdmin(username: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  updateAdminCredentials(id: number, username: string, password: string): Promise<Admin>;
  
  // Portfolio content operations
  getPortfolioContent(section: string): Promise<PortfolioContent | undefined>;
  getAllPortfolioContent(): Promise<PortfolioContent[]>;
  upsertPortfolioContent(content: InsertPortfolioContent): Promise<PortfolioContent>;
  
  // Skills operations
  getAllSkills(): Promise<Skill[]>;
  getSkillsByCategory(category: string): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill>;
  deleteSkill(id: number): Promise<void>;
  
  // Projects operations
  getAllProjects(): Promise<Project[]>;
  getFeaturedProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  
  // Experience operations
  getAllExperiences(): Promise<Experience[]>;
  createExperience(experience: InsertExperience): Promise<Experience>;
  updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience>;
  deleteExperience(id: number): Promise<void>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublicBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: number): Promise<void>;
  
  // Contact info operations
  getContactInfo(): Promise<ContactInfo | undefined>;
  upsertContactInfo(contact: InsertContactInfo): Promise<ContactInfo>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private admins: Admin[] = [];
  private portfolioContent: PortfolioContent[] = [];
  private skills: Skill[] = [];
  private projects: Project[] = [];
  private experiences: Experience[] = [];
  private blogPosts: BlogPost[] = [];
  private contactInfo: ContactInfo[] = [];
  private nextId = 1;

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Create default admin (password: admin123)
    this.admins.push({
      id: 1,
      username: "admin",
      password: "$2b$10$rOZhHqI5Fv1.m9JgE5GQfOl1G8X.2pNEzV5Qq8K2XbF6HjT3wY9bG", // bcrypt hash of 'admin123'
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Initialize hero section
    this.portfolioContent.push({
      id: 1,
      section: "hero",
      title: "Cybersecurity Penetration Tester",
      subtitle: "Securing Digital Assets Through Ethical Hacking",
      content: "Aspiring penetration tester specializing in identifying vulnerabilities and strengthening security postures for organizations.",
      imageUrl: null,
      updatedAt: new Date(),
    });

    // Initialize about section
    this.portfolioContent.push({
      id: 2,
      section: "about",
      title: "About Me",
      subtitle: "Passionate About Cybersecurity",
      content: "I am an aspiring penetration tester with a passion for cybersecurity and ethical hacking. My goal is to help organizations identify and fix security vulnerabilities before malicious actors can exploit them.",
      imageUrl: null,
      updatedAt: new Date(),
    });

    // Initialize default skills
    const defaultSkills = [
      { category: "technical", name: "Network Security", level: "intermediate", description: "Understanding of network protocols and security measures" },
      { category: "technical", name: "Web Application Security", level: "intermediate", description: "OWASP Top 10 vulnerabilities and testing methodologies" },
      { category: "technical", name: "Linux Administration", level: "advanced", description: "Command line proficiency and system administration" },
      { category: "tools", name: "Burp Suite", level: "intermediate", description: "Web application security testing platform" },
      { category: "tools", name: "Nmap", level: "advanced", description: "Network discovery and security auditing" },
      { category: "tools", name: "Metasploit", level: "beginner", description: "Penetration testing framework" },
      { category: "certifications", name: "CompTIA Security+", level: "planning", description: "Foundational cybersecurity certification" },
      { category: "certifications", name: "CEH (Certified Ethical Hacker)", level: "planning", description: "Ethical hacking certification" },
    ];

    defaultSkills.forEach((skill, index) => {
      this.skills.push({
        id: index + 1,
        ...skill,
        iconUrl: null,
        order: index + 1,
      });
    });

    // Initialize default projects
    this.projects.push({
      id: 1,
      title: "Home Network Security Assessment",
      description: "Comprehensive security assessment of a home network environment, identifying vulnerabilities and implementing security measures.",
      shortDescription: "Security assessment and hardening of home network infrastructure",
      technologies: ["Nmap", "Wireshark", "pfSense", "Network Analysis"],
      imageUrl: null,
      demoUrl: null,
      githubUrl: null,
      status: "completed",
      featured: true,
      order: 1,
      createdAt: new Date(),
    });

    // Initialize default experience
    this.experiences.push({
      id: 1,
      company: "Self-Study & Lab Environment",
      position: "Cybersecurity Student",
      location: "Remote",
      startDate: "2024-01",
      endDate: null,
      description: "Building hands-on experience through virtual labs, CTF challenges, and security research.",
      achievements: ["Completed 50+ TryHackMe rooms", "Set up home penetration testing lab", "Participated in local cybersecurity meetups"],
      technologies: ["Kali Linux", "VirtualBox", "Burp Suite", "Nmap", "John the Ripper"],
      order: 1,
    });

    // Initialize contact info
    this.contactInfo.push({
      id: 1,
      email: "contact@yourname.com",
      phone: "+1 (555) 123-4567",
      location: "Your City, Country",
      linkedin: "https://linkedin.com/in/yourprofile",
      github: "https://github.com/yourusername",
      twitter: "https://twitter.com/yourusername",
      website: "https://yourportfolio.com",
      resumeUrl: null,
      updatedAt: new Date(),
    });

    this.nextId = 100;
  }

  // Admin operations
  async getAdmin(username: string): Promise<Admin | undefined> {
    return this.admins.find(admin => admin.username === username);
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const newAdmin: Admin = {
      id: this.nextId++,
      ...admin,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.admins.push(newAdmin);
    return newAdmin;
  }

  async updateAdminCredentials(id: number, username: string, password: string): Promise<Admin> {
    const adminIndex = this.admins.findIndex(admin => admin.id === id);
    if (adminIndex === -1) throw new Error("Admin not found");
    
    this.admins[adminIndex].username = username;
    this.admins[adminIndex].password = password;
    this.admins[adminIndex].updatedAt = new Date();
    
    return this.admins[adminIndex];
  }

  // Portfolio content operations
  async getPortfolioContent(section: string): Promise<PortfolioContent | undefined> {
    return this.portfolioContent.find(content => content.section === section);
  }

  async getAllPortfolioContent(): Promise<PortfolioContent[]> {
    return this.portfolioContent;
  }

  async upsertPortfolioContent(content: InsertPortfolioContent): Promise<PortfolioContent> {
    const existingIndex = this.portfolioContent.findIndex(pc => pc.section === content.section);
    
    if (existingIndex !== -1) {
      this.portfolioContent[existingIndex] = {
        ...this.portfolioContent[existingIndex],
        ...content,
        updatedAt: new Date(),
      };
      return this.portfolioContent[existingIndex];
    } else {
      const newContent: PortfolioContent = {
        id: this.nextId++,
        ...content,
        updatedAt: new Date(),
      };
      this.portfolioContent.push(newContent);
      return newContent;
    }
  }

  // Skills operations
  async getAllSkills(): Promise<Skill[]> {
    return this.skills.sort((a, b) => a.order - b.order);
  }

  async getSkillsByCategory(category: string): Promise<Skill[]> {
    return this.skills.filter(skill => skill.category === category).sort((a, b) => a.order - b.order);
  }

  async createSkill(skill: InsertSkill): Promise<Skill> {
    const newSkill: Skill = {
      id: this.nextId++,
      ...skill,
      order: this.skills.length + 1,
    };
    this.skills.push(newSkill);
    return newSkill;
  }

  async updateSkill(id: number, skill: Partial<InsertSkill>): Promise<Skill> {
    const skillIndex = this.skills.findIndex(s => s.id === id);
    if (skillIndex === -1) throw new Error("Skill not found");
    
    this.skills[skillIndex] = { ...this.skills[skillIndex], ...skill };
    return this.skills[skillIndex];
  }

  async deleteSkill(id: number): Promise<void> {
    const skillIndex = this.skills.findIndex(s => s.id === id);
    if (skillIndex === -1) throw new Error("Skill not found");
    this.skills.splice(skillIndex, 1);
  }

  // Projects operations
  async getAllProjects(): Promise<Project[]> {
    return this.projects.sort((a, b) => a.order - b.order);
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.projects.filter(project => project.featured).sort((a, b) => a.order - b.order);
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.find(project => project.id === id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject: Project = {
      id: this.nextId++,
      ...project,
      order: this.projects.length + 1,
      createdAt: new Date(),
    };
    this.projects.push(newProject);
    return newProject;
  }

  async updateProject(id: number, project: Partial<InsertProject>): Promise<Project> {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) throw new Error("Project not found");
    
    this.projects[projectIndex] = { ...this.projects[projectIndex], ...project };
    return this.projects[projectIndex];
  }

  async deleteProject(id: number): Promise<void> {
    const projectIndex = this.projects.findIndex(p => p.id === id);
    if (projectIndex === -1) throw new Error("Project not found");
    this.projects.splice(projectIndex, 1);
  }

  // Experience operations
  async getAllExperiences(): Promise<Experience[]> {
    return this.experiences.sort((a, b) => a.order - b.order);
  }

  async createExperience(experience: InsertExperience): Promise<Experience> {
    const newExperience: Experience = {
      id: this.nextId++,
      ...experience,
      order: this.experiences.length + 1,
    };
    this.experiences.push(newExperience);
    return newExperience;
  }

  async updateExperience(id: number, experience: Partial<InsertExperience>): Promise<Experience> {
    const experienceIndex = this.experiences.findIndex(e => e.id === id);
    if (experienceIndex === -1) throw new Error("Experience not found");
    
    this.experiences[experienceIndex] = { ...this.experiences[experienceIndex], ...experience };
    return this.experiences[experienceIndex];
  }

  async deleteExperience(id: number): Promise<void> {
    const experienceIndex = this.experiences.findIndex(e => e.id === id);
    if (experienceIndex === -1) throw new Error("Experience not found");
    this.experiences.splice(experienceIndex, 1);
  }

  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getPublicBlogPosts(): Promise<BlogPost[]> {
    return this.blogPosts
      .filter(post => post.isPublic)
      .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
  }

  async getBlogPost(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.find(post => post.id === id);
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return this.blogPosts.find(post => post.slug === slug);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const newPost: BlogPost = {
      id: this.nextId++,
      ...post,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.blogPosts.push(newPost);
    return newPost;
  }

  async updateBlogPost(id: number, post: Partial<InsertBlogPost>): Promise<BlogPost> {
    const postIndex = this.blogPosts.findIndex(p => p.id === id);
    if (postIndex === -1) throw new Error("Blog post not found");
    
    this.blogPosts[postIndex] = {
      ...this.blogPosts[postIndex],
      ...post,
      updatedAt: new Date(),
    };
    return this.blogPosts[postIndex];
  }

  async deleteBlogPost(id: number): Promise<void> {
    const postIndex = this.blogPosts.findIndex(p => p.id === id);
    if (postIndex === -1) throw new Error("Blog post not found");
    this.blogPosts.splice(postIndex, 1);
  }

  // Contact info operations
  async getContactInfo(): Promise<ContactInfo | undefined> {
    return this.contactInfo[0];
  }

  async upsertContactInfo(contact: InsertContactInfo): Promise<ContactInfo> {
    if (this.contactInfo.length > 0) {
      this.contactInfo[0] = {
        ...this.contactInfo[0],
        ...contact,
        updatedAt: new Date(),
      };
      return this.contactInfo[0];
    } else {
      const newContact: ContactInfo = {
        id: this.nextId++,
        ...contact,
        updatedAt: new Date(),
      };
      this.contactInfo.push(newContact);
      return newContact;
    }
  }
}

export const storage = new MemStorage();