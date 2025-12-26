import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { urlFor } from "../lib/sanity/image";

type PortableTextRendererProps = {
  value: PortableTextBlock[];
};

type ReviewImageBlock = {
  _type: "reviewImage";
  asset: any;
  alt: string;
  size: "small" | "medium" | "large" | "featured";
  alignment: "left" | "right" | "center";
};

const components: PortableTextComponents = {
  types: {
    reviewImage: ({ value }: { value: ReviewImageBlock }) => {
      if (!value?.asset) return null;

      try {
        const imageUrl = urlFor(value.asset).width(1200).url();
        
        // If URL generation fails or returns empty, don't render
        if (!imageUrl || imageUrl.trim() === "") {
          console.warn("Failed to generate image URL for reviewImage:", value);
          return null;
        }

        const sizeClasses = {
          small: "max-w-xs",
          medium: "max-w-md",
          large: "max-w-2xl",
          featured: "max-w-full",
        };
        const alignmentClasses = {
          left: "float-left mr-4 mb-4",
          right: "float-right ml-4 mb-4",
          center: "mx-auto my-6",
        };

        const sizeClass = sizeClasses[value.size || "medium"];
        const alignmentClass = alignmentClasses[value.alignment || "center"];

        return (
          <figure
            className={`review-image review-image-${value.size || "medium"} review-image-${value.alignment || "center"} surface-chamfer border border-[var(--border-accent-strong)] ${sizeClass} ${alignmentClass}`}
          >
            <Image
              src={imageUrl}
              alt={value.alt || ""}
              width={value.size === "featured" ? 1200 : 800}
              height={value.size === "featured" ? 600 : 800}
              className="w-full h-auto object-cover"
              sizes={
                value.size === "featured"
                  ? "100vw"
                  : value.size === "large"
                    ? "(max-width: 768px) 100vw, 672px"
                    : value.size === "medium"
                      ? "(max-width: 768px) 100vw, 448px"
                      : "(max-width: 768px) 100vw, 320px"
              }
            />
            {value.alt && (
              <figcaption className="text-sm text-[var(--text-muted)] mt-2">
                {value.alt}
              </figcaption>
            )}
          </figure>
        );
      } catch (error) {
        console.error("Error rendering reviewImage:", error, value);
        return null;
      }
    },
  },
  block: {
    h1: ({ children }) => (
      <h1 className="font-display text-[clamp(1.75rem,1.6vw+1rem,2.25rem)] leading-tight text-[var(--text-deep-purple)] mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-[var(--text-h2)] leading-tight text-[var(--text-deep-purple)] mt-6 mb-3">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-lg font-semibold text-[var(--text-deep-purple)] mt-4 mb-2">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const target = (value?.href || "").startsWith("http") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className="focus-chamfer text-[var(--text-deep-purple)] hover:underline"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 ml-4">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 ml-4">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || !Array.isArray(value) || value.length === 0) return null;

  return (
    <div className="portable-text-content">
      <PortableText value={value} components={components} />
    </div>
  );
}

