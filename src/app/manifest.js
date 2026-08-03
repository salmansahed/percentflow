export default function manifest() {
  return {
    name: "Countro - Multi-Utility Calculator",
    short_name: "Countro",
    description: "A fast, modern, and precise calculation suite.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f5f9",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
