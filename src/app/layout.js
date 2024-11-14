import Footer from "@/components/general/Footer";
import Header from "@/components/general/Header";
import "./globals.css"

export const metadata = {
  title: "NEXT JS BLOG SAMPLE",
  description: "This is description for next js blog",
  keywords: "upload post, upload image, upload tags, add posts, next js, react js, next js blog, vercel"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
