export const metadata = {
  title: "Fitness Blender",
  description: "Workout Complete",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL@0..1"
          rel="stylesheet"
        />
        <link
          href="https://cloudfront.fitnessblender.com/assets/bundle/styles-32b53c23e23d209a78d1.css"
          rel="stylesheet"
        />
        <style>{`
  .brand a {
    background-image: url('/assets/img/logos/fb-logo.svg') !important;
  }
`}</style>


      </head>
      <body className="announcement_body">{children}</body>
    </html>
  );
}