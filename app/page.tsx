import Header from "./components/Header";
import Footer from "./components/Footer";
import BannerSlider from "./components/BannerSlider";

export default function Top() {
  return (
    <div className="min-h-screen font-sans max-w-6xl mx-auto px-4 flex flex-col gap-6 sm:gap-8">
      <Header />
      <main className="flex flex-col gap-6 sm:gap-8 row-start-2 items-center sm:items-start">
        <BannerSlider />
      </main>
      <Footer />
    </div>
  );
}
