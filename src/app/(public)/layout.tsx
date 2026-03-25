import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { GrainOverlay } from "@/shared/ui";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <GrainOverlay />
      <Header />
      {children}
      <Footer />
    </>
  );
}
