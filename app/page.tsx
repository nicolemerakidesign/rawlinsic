import HomePage from "@/components/home-page";

export default function Page() {
  return (
    <>
      {/* Preload the LCP hero poster so the browser starts fetching it
          as soon as the HTML arrives, instead of waiting for the <video>
          element to initialize. Drops LCP on slow mobile connections. */}
      <link
        rel="preload"
        as="image"
        href="/images/pages/hero-poster.webp"
        // @ts-expect-error fetchPriority is valid HTML but not typed on link yet
        fetchPriority="high"
      />
      <HomePage />
    </>
  );
}
