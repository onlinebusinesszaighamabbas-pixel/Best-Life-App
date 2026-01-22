import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@db";
import { userProfiles, ads, videos } from "@db/schema";
import { eq, sql } from "drizzle-orm";

export function registerRoutes(app: Express): Server {
  
  // 1. گفٹنگ سسٹم (80/20 کمیشن لاجک)
  app.post("/api/send-gift", async (req, res) => {
    const { senderId, receiverId, amount } = req.body;
    const creatorShare = amount * 0.8; // 80% کریئیٹر کا
    const adminShare = amount * 0.2;  // 20% آپ کا (کمپنی کا)

    await db.update(userProfiles)
      .set({ balanceVal: sql`${userProfiles.balanceVal} + ${creatorShare}` })
      .where(eq(userProfiles.userId, receiverId));
      
    res.json({ success: true, message: "Gift sent successfully!" });
  });

  // 2. ود ڈرا سسٹم (500 PKR کم از کم حد)
  app.post("/api/withdraw", async (req, res) => {
    const { userId, amount } = req.body;
    if (amount < 500) {
      return res.status(400).json({ message: "کم از کم 500 روپے ہونا لازمی ہے" });
    }
    // ود ڈرا کی باقی لاجک یہاں آئے گی
    res.json({ success: true });
  });

  // 3. اشتہارات دکھانے کا سسٹم (50 Slots)
  app.get("/api/ads", async (req, res) => {
    const allAds = await db.select().from(ads).where(eq(ads.isActive, true));
    res.json(allAds);
  });

  const httpServer = createServer(app);
  return httpServer;
}
