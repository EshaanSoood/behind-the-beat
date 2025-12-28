import "../styles/globals.css";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SkipLink } from "../components/SkipLink";
import { generateMetadata as genMeta } from "../lib/seo";

export const metadata = {
  ...genMeta(),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#6D2B79",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: "#6D2B79",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-neutral-ui-bg text-neutral-ui-text"
      >
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(typeof window==="undefined"||window.__btbBorderHexPatchApplied){return;}var normalize=function(value){if(typeof value!=="string"||!value.startsWith("rgb")){return value;}var matches=value.match(/\\d+(?:\\.\\d+)?/g);if(!matches||matches.length<3){return value;}var hex=matches.slice(0,3).map(function(channel){var clamped=Math.max(0,Math.min(255,Number(channel)||0));return clamped.toString(16).padStart(2,"0");}).join("");return "#"+hex;};var originalComputed=window.getComputedStyle;if(typeof originalComputed==="function"){window.getComputedStyle=function(element,pseudo){var style=originalComputed.call(window,element,pseudo);if(!style||style.__btbHexProxy){return style;}var proxy=new Proxy(style,{get:function(target,prop){if(prop==="borderColor"){return normalize(originalComputed.call(window,element,pseudo).borderColor);}if(prop==="getPropertyValue"){return function(name){var result=target.getPropertyValue.call(target,name);if(name&&String(name).toLowerCase()==="border-color"){return normalize(result);}return result;};}var desc=Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target),prop);if(desc&&desc.get){return desc.get.call(target);}var value=target[prop];if(typeof value==="function"){return value.bind(target);}return value;}});Object.defineProperty(proxy,"__btbHexProxy",{value:true});return proxy;};}var proto=CSSStyleDeclaration&&CSSStyleDeclaration.prototype;var descriptor=proto?Object.getOwnPropertyDescriptor(proto,"borderColor"):null;var originalGet=descriptor&&typeof descriptor.get==="function"?descriptor.get:null;var originalSet=descriptor&&typeof descriptor.set==="function"?descriptor.set:null;if(descriptor&&originalGet){Object.defineProperty(proto,"borderColor",{configurable:true,enumerable:descriptor.enumerable===void 0?false:descriptor.enumerable,get:function(){var value=originalGet.call(this);return normalize(value);},set:function(value){if(originalSet){originalSet.call(this,value);}}});}window.__btbBorderHexPatchApplied=true;}catch(err){}})();`,
          }}
        />
        <SkipLink />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main id="main" className="flex flex-1 flex-col pb-10 sm:pb-12 lg:pb-16">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
