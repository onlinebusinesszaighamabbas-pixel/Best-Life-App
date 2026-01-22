import { pgTable, text, serial, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";

// یوزر پروفائل (والٹ اور سوشل لنکس)
export const userProfiles = pgTable("user_profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().unique(),
  username: text("username").unique(),
  balanceVal: integer("balance_val").default(0),
  youtubeLink: text("youtube_link"),
  facebookLink: text("facebook_link"),
});

// 50 اشتہارات کا نظام (Ads Slot Management)
export const ads = pgTable("ads", {
  id: serial("id").primaryKey(),
  slotNumber: integer("slot_number").notNull(), 
  mediaUrl: text("media_url"),
  targetLink: text("target_link"),
  isActive: boolean("is_active").default(true),
});

// ویڈیوز کا ڈیٹا (آپ کی دی ہوئی کوڈنگ)
export const videos = pgTable("videos", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
