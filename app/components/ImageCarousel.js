"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageCarousel({
  images,
  alt = "",
  className = "",
  priority = false,
  sizes,
}) {
  const slides = images?.length ? images : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  if (slides.length <= 1) {
    const image = slides[0];

    if (!image) {
      return null;
    }

    return (
      <Image
        unoptimized
        src={image.src}
        alt={alt || image.alt || ""}
        fill
        priority={priority}
        sizes={sizes}
      />
    );
  }

  function showSlide(nextIndex) {
    setActiveIndex((nextIndex + slides.length) % slides.length);
  }

  function handleTouchEnd(event) {
    if (touchStart === null) {
      return;
    }

    const distance = touchStart - event.changedTouches[0].clientX;
    setTouchStart(null);

    if (Math.abs(distance) < 36) {
      return;
    }

    showSlide(activeIndex + (distance > 0 ? 1 : -1));
  }

  return (
    <div
      className={`image-carousel ${className}`.trim()}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((image, index) => (
        <Image
          key={image.id || image.storagePath || image.src}
          unoptimized
          src={image.src}
          alt={alt || image.alt || ""}
          fill
          priority={priority && index === 0}
          sizes={sizes}
          className={index === activeIndex ? "active" : ""}
          aria-hidden={index === activeIndex ? undefined : true}
        />
      ))}
      <button
        className="carousel-button previous"
        type="button"
        aria-label="Show previous image"
        onClick={() => showSlide(activeIndex - 1)}
      >
        Prev
      </button>
      <button
        className="carousel-button next"
        type="button"
        aria-label="Show next image"
        onClick={() => showSlide(activeIndex + 1)}
      >
        Next
      </button>
      <div className="carousel-dots" aria-label="Image carousel position">
        {slides.map((image, index) => (
          <button
            key={image.id || image.storagePath || image.src}
            type="button"
            aria-label={`Show image ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
