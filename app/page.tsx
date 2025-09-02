import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BannerSlider from "./components/BannerSlider";

//min-h-screen: 画面の高さが小さい場合でもフッターを画面下部に固定
//flex: これは 要素を Flexbox コンテナにする だけのクラス デフォルトでは 横方向（row）に並ぶ
//flex-col: flex と組み合わせて使う 方向変更クラス 子要素が 縦に並ぶ ようになる
//max-w-6xl: コンテンツの最大幅を設定
//mx-auto: 横方向中央寄せ
//px-4: 横方向のパディングを設定
//gap-8: 要素間の隙間を設定

export default function Top() {
  return (
    <div className="min-h-screen font-sans max-w-6xl mx-auto px-4 flex flex-col gap-8">
      <Header />
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <BannerSlider />
      </main>
      <Footer />
    </div>

  );
}
