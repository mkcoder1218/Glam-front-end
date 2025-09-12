"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Filter, Heart, Share2, Eye } from "lucide-react"

const categories = ["All", "Cuts", "Color", "Styling", "Bridal", "Men's"]

const galleryItems = [
  {
    id: 1,
    category: "Color",
    title: "Sunset Balayage",
    description: "Warm golden highlights with natural dimension",
    image: "beautiful sunset balayage hair color with golden highlights",
    likes: 24,
    featured: true,
  },
  {
    id: 2,
    category: "Cuts",
    title: "Modern Bob",
    description: "Sleek precision bob with subtle layers",
    image: "modern precision bob haircut with sleek styling",
    likes: 18,
    featured: false,
  },
  {
    id: 3,
    category: "Bridal",
    title: "Romantic Updo",
    description: "Elegant bridal updo with soft curls",
    image: "elegant bridal updo hairstyle with romantic curls",
    likes: 32,
    featured: true,
  },
  {
    id: 4,
    category: "Color",
    title: "Platinum Blonde",
    description: "Cool-toned platinum with root shadow",
    image: "platinum blonde hair color with cool tones",
    likes: 27,
    featured: false,
  },
  {
    id: 5,
    category: "Styling",
    title: "Beach Waves",
    description: "Effortless beachy waves with texture",
    image: "natural beach waves hairstyle with texture",
    likes: 21,
    featured: false,
  },
  {
    id: 6,
    category: "Men's",
    title: "Classic Fade",
    description: "Sharp fade with textured top",
    image: "classic men's fade haircut with textured styling",
    likes: 15,
    featured: false,
  },
  {
    id: 7,
    category: "Color",
    title: "Rose Gold",
    description: "Trendy rose gold with dimensional highlights",
    image: "rose gold hair color with dimensional highlights",
    likes: 29,
    featured: true,
  },
  {
    id: 8,
    category: "Cuts",
    title: "Layered Lob",
    description: "Long bob with face-framing layers",
    image: "layered long bob haircut with face framing layers",
    likes: 22,
    featured: false,
  },
  {
    id: 9,
    category: "Styling",
    title: "Vintage Curls",
    description: "Classic Hollywood glamour curls",
    image: "vintage Hollywood glamour curls hairstyle",
    likes: 26,
    featured: false,
  },
  {
    id: 10,
    category: "Bridal",
    title: "Boho Braid",
    description: "Bohemian braided style with flowers",
    image: "bohemian braided bridal hairstyle with flowers",
    likes: 31,
    featured: true,
  },
  {
    id: 11,
    category: "Color",
    title: "Copper Highlights",
    description: "Rich copper tones with natural base",
    image: "rich copper hair highlights with natural base color",
    likes: 19,
    featured: false,
  },
  {
    id: 12,
    category: "Men's",
    title: "Textured Crop",
    description: "Modern textured crop with clean lines",
    image: "modern textured crop men's haircut with clean lines",
    likes: 17,
    featured: false,
  },
]

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const filteredItems =
    selectedCategory === "All" ? galleryItems : galleryItems.filter((item) => item.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">Our Work</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-card-foreground mb-6 text-balance">Hair Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Explore our portfolio of stunning hair transformations. From precision cuts to vibrant colors, see the
            artistry and expertise that goes into every style we create.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2 mr-6">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "border-border text-foreground hover:bg-secondary bg-transparent"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="break-inside-avoid group cursor-pointer border-border bg-card hover:shadow-xl transition-all duration-300 overflow-hidden"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="relative overflow-hidden">
                  {item.featured && (
                    <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground">Featured</Badge>
                  )}

                  <img
                    src={`/abstract-geometric-shapes.png?height=${Math.floor(Math.random() * 200) + 300}&width=400&query=${item.image}`}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-300 ${
                      hoveredItem === item.id ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <div className="text-center text-white p-4">
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm mb-4 opacity-90">{item.description}</p>
                      <div className="flex items-center justify-center space-x-4">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
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
                      <h3 className="font-semibold text-card-foreground">{item.title}</h3>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {item.category}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No items found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-card">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-card-foreground mb-4">
            Ready for Your Own Transformation?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let our expert stylists create a beautiful, personalized look just for you. Book your consultation today and
            join our gallery of satisfied clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
              Book Consultation
            </Button>
            <Button
              variant="outline"
              className="border-border text-card-foreground hover:bg-secondary bg-transparent px-8 py-3"
            >
              View Services
            </Button>
          </div>
        </div>
      </section>

      {/* Instagram Feed Teaser */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Follow Us for Daily Inspiration</h3>
          <p className="text-muted-foreground mb-6">
            Stay updated with our latest work and hair trends on social media
          </p>
          <Button variant="outline" className="border-border text-foreground hover:bg-secondary bg-transparent">
            @LuxeSalon on Instagram
          </Button>
        </div>
      </section>
    </div>
  )
}
