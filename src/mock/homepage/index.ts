export interface Slide {
  image: string;
  title: string;
  description: string;
  backgroundContent: string;
  colorTitle: string;
  colorDescription: string;
  backgroundButton: "#ffffff" | "#000000";
}

export const SlideWorks: Slide[] = [
  {
    image: "/images/discorver1.png",
    title: "Explore House & Car Rentals",
    description:
      "Explore a variety of house and car rental options for your travel needs. Find the perfect home and vehicle with flexible, hassle-free solutions.",
    backgroundContent: "#075da7",
    colorTitle: "#000000",
    colorDescription: "#000000",
    backgroundButton: "#000000",
  },
  {
    image: "/images/carosel-home1.jpg",
    title: "Top Rated, Trusted by All",
    description:
      "Experience the Best with Top Ratings, Trusted by Thousands for Unmatched Quality and Service.",
    backgroundContent: "#44aa64",
    colorTitle: "#ffffff",
    colorDescription: "#ffffff",
    backgroundButton: "#000000",
  },
  {
    image: "/images/carosel-home.png",
    title: "Low Prices, High Value",
    description:
      "Enjoy high-quality products at prices that offer unbeatable value. Get the best performance without compromising your budget",
    backgroundContent: "#cc0008",
    colorTitle: "#000000",
    colorDescription: "#000000",
    backgroundButton: "#000000",
  },
  {
    image: "/images/carosel-home.png",
    title: "Stylish Furniture Rentals",
    description:
      "Transform your space with our stylish furniture rental options, ideal for any occasion.",
    backgroundContent: "#f4ce7c",
    colorTitle: "#000000",
    colorDescription: "#000000",
    backgroundButton: "#000000",
  },
];
