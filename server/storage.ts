import { 
  users, services, certificates, contactSubmissions, fileUploads, blogPosts,
  type User, type InsertUser, type Service, type InsertService,
  type Certificate, type InsertCertificate, type ContactSubmission, type InsertContactSubmission,
  type FileUpload, type InsertFileUpload, type BlogPost, type InsertBlogPost
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Service methods
  getAllServices(): Promise<Service[]>;
  getServicesByCountry(country: string): Promise<Service[]>;
  getService(id: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<boolean>;

  // Certificate methods
  getAllCertificates(): Promise<Certificate[]>;
  getCertificate(id: string): Promise<Certificate | undefined>;
  getCertificateByNumber(certificateNumber: string): Promise<Certificate | undefined>;
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  updateCertificate(id: string, certificate: Partial<InsertCertificate>): Promise<Certificate>;
  deleteCertificate(id: string): Promise<boolean>;
  verifyCertificate(certificateNumber: string, clientName?: string, clientEmail?: string): Promise<Certificate | null>;

  // Contact methods
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: string): Promise<ContactSubmission | undefined>;
  createContactSubmission(contact: InsertContactSubmission): Promise<ContactSubmission>;
  markContactAsRead(id: string): Promise<boolean>;

  // File upload methods
  getAllFileUploads(): Promise<FileUpload[]>;
  getFileUpload(id: string): Promise<FileUpload | undefined>;
  createFileUpload(file: InsertFileUpload): Promise<FileUpload>;
  deleteFileUpload(id: string): Promise<boolean>;

  // Blog methods
  getAllBlogPosts(): Promise<BlogPost[]>;
  getPublishedBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: Partial<InsertBlogPost>): Promise<BlogPost>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Service methods
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.isActive, true)).orderBy(desc(services.createdAt));
  }

  async getServicesByCountry(country: string): Promise<Service[]> {
    return await db.select().from(services)
      .where(and(eq(services.country, country), eq(services.isActive, true)))
      .orderBy(desc(services.createdAt));
  }

  async getService(id: string): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service || undefined;
  }

  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }

  async updateService(id: string, updateData: Partial<InsertService>): Promise<Service> {
    const [service] = await db.update(services)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(services.id, id))
      .returning();
    return service;
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.update(services)
      .set({ isActive: false })
      .where(eq(services.id, id));
    return result.rowCount > 0;
  }

  // Certificate methods
  async getAllCertificates(): Promise<Certificate[]> {
    return await db.select().from(certificates).orderBy(desc(certificates.createdAt));
  }

  async getCertificate(id: string): Promise<Certificate | undefined> {
    const [certificate] = await db.select().from(certificates).where(eq(certificates.id, id));
    return certificate || undefined;
  }

  async getCertificateByNumber(certificateNumber: string): Promise<Certificate | undefined> {
    const [certificate] = await db.select().from(certificates)
      .where(eq(certificates.certificateNumber, certificateNumber));
    return certificate || undefined;
  }

  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const [certificate] = await db.insert(certificates).values(insertCertificate).returning();
    return certificate;
  }

  async updateCertificate(id: string, updateData: Partial<InsertCertificate>): Promise<Certificate> {
    const [certificate] = await db.update(certificates)
      .set(updateData)
      .where(eq(certificates.id, id))
      .returning();
    return certificate;
  }

  async deleteCertificate(id: string): Promise<boolean> {
    const result = await db.delete(certificates).where(eq(certificates.id, id));
    return result.rowCount > 0;
  }

  async verifyCertificate(certificateNumber: string, clientName?: string, clientEmail?: string): Promise<Certificate | null> {
    let query = db.select().from(certificates).where(eq(certificates.certificateNumber, certificateNumber));
    
    if (clientName || clientEmail) {
      const conditions = [eq(certificates.certificateNumber, certificateNumber)];
      if (clientName) conditions.push(eq(certificates.clientName, clientName));
      if (clientEmail) conditions.push(eq(certificates.clientEmail, clientEmail));
      query = db.select().from(certificates).where(and(...conditions));
    }

    const [certificate] = await query;
    return certificate || null;
  }

  // Contact methods
  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
  }

  async getContactSubmission(id: string): Promise<ContactSubmission | undefined> {
    const [contact] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return contact || undefined;
  }

  async createContactSubmission(insertContact: InsertContactSubmission): Promise<ContactSubmission> {
    const [contact] = await db.insert(contactSubmissions).values(insertContact).returning();
    return contact;
  }

  async markContactAsRead(id: string): Promise<boolean> {
    const result = await db.update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
    return result.rowCount > 0;
  }

  // File upload methods
  async getAllFileUploads(): Promise<FileUpload[]> {
    return await db.select().from(fileUploads).orderBy(desc(fileUploads.createdAt));
  }

  async getFileUpload(id: string): Promise<FileUpload | undefined> {
    const [file] = await db.select().from(fileUploads).where(eq(fileUploads.id, id));
    return file || undefined;
  }

  async createFileUpload(insertFile: InsertFileUpload): Promise<FileUpload> {
    const [file] = await db.insert(fileUploads).values(insertFile).returning();
    return file;
  }

  async deleteFileUpload(id: string): Promise<boolean> {
    const result = await db.delete(fileUploads).where(eq(fileUploads.id, id));
    return result.rowCount > 0;
  }

  // Blog methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
  }

  async getPublishedBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(blogPosts)
      .where(eq(blogPosts.isPublished, true))
      .orderBy(desc(blogPosts.createdAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, id));
    return post || undefined;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug));
    return post || undefined;
  }

  async createBlogPost(insertPost: InsertBlogPost): Promise<BlogPost> {
    const [post] = await db.insert(blogPosts).values(insertPost).returning();
    return post;
  }

  async updateBlogPost(id: string, updateData: Partial<InsertBlogPost>): Promise<BlogPost> {
    const [post] = await db.update(blogPosts)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(blogPosts.id, id))
      .returning();
    return post;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return result.rowCount > 0;
  }
}

export const storage = new DatabaseStorage();
