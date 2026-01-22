import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminPanel() {
  const [adSlots] = useState(Array.from({ length: 50 })); // 50 سلاٹس کی فہرست

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">Best Life - Ads Control Center</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adSlots.map((_, index) => (
          <Card key={index} className="bg-zinc-900 border-zinc-800">
            <CardHeader className="border-b border-zinc-800 pb-2">
              <CardTitle className="text-sm font-medium text-primary">
                Sponsor Slot #{index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label>Ad Video/Image URL</Label>
                <Input placeholder="https://video-link.mp4" className="bg-black border-zinc-700" />
              </div>
              
              <div className="space-y-2">
                <Label>Company Target Link</Label>
                <Input placeholder="https://company-website.com" className="bg-black border-zinc-700" />
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">Activate Ad</Button>
                <Button variant="destructive">Remove</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
