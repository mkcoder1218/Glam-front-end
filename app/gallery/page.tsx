"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Share2, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { encodeQuery } from "@/utils/utils";
import { GallerySlice } from "@/store/slice/Gallery";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

export default function GalleryPage() {
  const dispatch = useAppDispatch();
  const gallery = useAppSelector((state) => (state.gallery.items as any)?.data);
  const galleryLoading = useAppSelector((state) => state.gallery.loading);
  const total = useAppSelector(
    (state) => (state.gallery.items as any)?.meta?.total
  );

  // Pagination setup
  const [page, setPage] = useState(1);
  const limit = 8;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);

  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  // Modal state
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Fetch gallery data
  useEffect(() => {
    const query = encodeQuery({
      limit,
      offset,
      order: [["id", "DESC"]],
      include: [{ model: "File" }],
    });
    dispatch(GallerySlice.actions?.fetchAllGallery(query));
  }, [page, dispatch]);

  // Open modal instead of navigation
  const handleView = (item: any) => {
    setSelectedItem(item);
  };

  const handleShare = async (item: any) => {
    const url = `${window.location.origin}/gallery/${item.id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert("🔗 Link copied to clipboard!");
    } catch {
      alert("❌ Failed to copy link.");
    }
  };

  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setPage((prev) => (totalPages && prev < totalPages ? prev + 1 : prev));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-5 bg-card text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-6">
          Glam Gallery
        </h1>
        <p className="text-xs font-light text-muted-foreground max-w-3xl mx-auto">
          Explore our portfolio of stunning hair transformations. From precision
          cuts to vibrant colors, see the artistry and expertise that goes into
          every style we create.
        </p>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {galleryLoading ? (
            <div className="text-center text-muted-foreground py-12">
              Loading gallery...
            </div>
          ) : gallery?.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-lg">
              No items found.
            </div>
          ) : (
            <>
              <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {gallery?.map((item: any) => (
                  <Card
                    key={item.id}
                    className="break-inside-avoid group cursor-pointer border-border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden"
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={`http://api.glamnestsalon.com/${item?.File?.path}`}
                        alt={item.name}
                        className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Hover Overlay */}
                      <div
                        className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                          hoveredItem === item.id ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="text-center text-white p-4">
                          <h3 className="text-lg font-semibold mb-2">
                            {item.name}
                          </h3>
                          <p className="text-sm mb-4 opacity-90">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-center space-x-4">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                              onClick={() => handleView(item)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                              onClick={() => handleShare(item)}
                            >
                              <Share2 className="h-4 w-4 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-card-foreground">
                            {item.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {item.description}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex justify-center mt-10 space-x-4">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={handlePrev}
                  className="min-w-[120px]"
                >
                  Previous
                </Button>
                <div className="text-muted-foreground flex items-center">
                  Page {page} {totalPages ? `of ${totalPages}` : ""}
                </div>
                <Button
                  variant="outline"
                  disabled={totalPages ? page >= totalPages : false}
                  onClick={handleNext}
                  className="min-w-[120px]"
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedItem && (
            <>
              <DialogHeader className="p-4 pb-0 flex justify-between items-center">
                <div>
                  <DialogTitle>{selectedItem.name}</DialogTitle>
                  <DialogDescription>
                    {selectedItem.description}
                  </DialogDescription>
                </div>
              </DialogHeader>
              <div className="p-4">
                <img
                  src={`http://api.glamnestsalon.com/${selectedItem?.File?.path}`}
                  alt={selectedItem.name}
                  className="w-full h-auto rounded-lg object-contain max-h-[80vh]"
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Instagram Section */}
      <section className="py-12 bg-background text-center">
        <h3 className="text-2xl font-bold text-foreground mb-4">
          Follow Us for Daily Inspiration
        </h3>
        <p className="text-muted-foreground mb-6">
          Stay updated with our latest work and hair trends on social media
        </p>
        <Button
          variant="outline"
          className="border-border text-foreground hover:bg-secondary bg-transparent"
        >
          @LuxeSalon on Instagram
        </Button>
      </section>
    </div>
  );
}
