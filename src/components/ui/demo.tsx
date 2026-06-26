import { InfiniteSlider } from "./infinite-slider-horizontal";
import { useState } from "react";
import { X } from "lucide-react";
 
const images = [
  {
    title: "Image 1",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 2",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 3",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 4",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 5",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 6",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 7",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 8",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 9",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  },
  {
    title: "Image 10",
    image: "https://res.cloudinary.com/djw0tqmiw/image/upload/v1782498852/s2s2jex5somkjda5taxo.jpg",
  }
];
 
export function DemoOne() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col justify-center gap-4 py-16 overflow-hidden">
        <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
          <InfiniteSlider direction="horizontal" duration={80} durationOnHover={10000}>
            {images.map((image, idx) => (
              <div 
                key={idx} 
                className="aspect-square w-[240px] md:w-[320px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image.image)}
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="object-cover h-full w-full rounded-[4px]"
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
        <div className="flex items-center space-x-4 mx-auto w-full max-w-max">
          <InfiniteSlider direction="horizontal" reverse duration={80} durationOnHover={10000}>
            {images.map((image, idx) => (
              <div 
                key={idx} 
                className="aspect-square w-[240px] md:w-[320px] rounded-[4px] cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setSelectedImage(image.image)}
              >
                <img
                  src={image.image}
                  alt={image.title}
                  className="object-cover h-full w-full rounded-[4px]"
                />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-8 h-8" />
          </button>
          <div 
            className="relative max-w-5xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Popup" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
