import { db } from "./db";
import { users, services, certificates } from "@shared/schema";
import bcrypt from "bcrypt";

async function seedDatabase() {
  try {
    console.log("Starting database seeding...");

    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({
      username: "admin",
      email: "admin@accredcert.com",
      password: hashedPassword,
      isAdmin: true
    }).onConflictDoNothing();

    // Create sample services
    const sampleServices = [
      {
        title: "US FDA Registration For Food, Beverages and Supplements",
        description: "Complete FDA facility registration and food product compliance for U.S. market entry.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "US FDA Registration For Cosmetics (MoCRA)",
        description: "Navigate the new MoCRA requirements for cosmetic product registration and compliance.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "FSVP Agent",
        description: "Foreign Supplier Verification Program agent services for food importers.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "US FDA Product Label Review",
        description: "Professional review and compliance verification for product labeling requirements.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "US FDA Prior Notice",
        description: "Prior notification services for food shipments entering the United States.",
        country: "USA",
        category: "FDA Compliance",
        imageUrl: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "US LLC Registration",
        description: "Complete business formation services for establishing your U.S. presence.",
        country: "USA",
        category: "Business Formation",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "FSSAI License",
        description: "Food Safety and Standards Authority of India licensing for food businesses.",
        country: "India",
        category: "Food Safety",
        imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "IEC (Import Export Code)",
        description: "Essential registration for businesses engaged in import-export activities in India.",
        country: "India",
        category: "Import Export",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "Business Registration",
        description: "Complete business formation and registration services in India.",
        country: "India",
        category: "Business Formation",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "International Compliance Consulting",
        description: "Global regulatory compliance solutions for international market expansion.",
        country: "Global",
        category: "Consulting",
        imageUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "Product Testing & Certification",
        description: "Comprehensive testing and certification services for global market compliance.",
        country: "Global",
        category: "Testing",
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      },
      {
        title: "Quality Management Systems",
        description: "Implementation and certification of ISO and other quality management standards.",
        country: "Global",
        category: "Quality Management",
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
      }
    ];

    await db.insert(services).values(sampleServices).onConflictDoNothing();

    // Create sample certificates
    const sampleCertificates = [
      {
        certificateNumber: "ACCR-2024-001",
        clientName: "ABC Food Company",
        clientEmail: "contact@abcfood.com",
        serviceType: "FDA Food Facility Registration",
        issueDate: new Date("2024-01-15"),
        expiryDate: new Date("2026-01-15"),
        status: "valid"
      },
      {
        certificateNumber: "ACCR-2024-002",
        clientName: "XYZ Cosmetics Inc",
        clientEmail: "info@xyzcosmetics.com",
        serviceType: "MoCRA Cosmetics Registration",
        issueDate: new Date("2024-02-20"),
        expiryDate: new Date("2026-02-20"),
        status: "valid"
      },
      {
        certificateNumber: "ACCR-2023-050",
        clientName: "Global Spices Ltd",
        clientEmail: "compliance@globalspices.com",
        serviceType: "FSVP Agent Services",
        issueDate: new Date("2023-06-10"),
        expiryDate: new Date("2024-06-10"),
        status: "expired"
      }
    ];

    await db.insert(certificates).values(sampleCertificates).onConflictDoNothing();

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Run if this is the main module
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  seedDatabase().then(() => process.exit(0));
}

export { seedDatabase };