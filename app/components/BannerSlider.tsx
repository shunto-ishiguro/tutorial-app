// BannerSlider.tsx
"use client";
// → Next.jsのApp Routerではデフォルトでコンポーネントはサーバーコンポーネント。
//    Swiperのようなブラウザ依存のライブラリを使う場合は
//    クライアントコンポーネントとして動作させる必要があるため "use client" を先頭に書く。

import { Swiper, SwiperSlide } from "swiper/react"; // → Swiper の React コンポーネントをインポート
import "swiper/css";// → Swiper のデフォルトCSSもインポート。これがないとスタイルが崩れる
import { Autoplay } from "swiper/modules"; // ← Autoplayモジュールをインポート
import Image from "next/image";

export default function BannerSlider() {
    const banners = ["/example1.jpg", "/example2.jpg"];

    return (
        // スライダー全体のラッパー
        <div className="w-full max-w-[1200px] mx-auto">
            {/* 
        Swiper コンポーネント：
        - spaceBetween: スライド間の余白(px)
        - slidesPerView: 一度に表示するスライド数
        - loop: trueで無限ループ
        - autoplay: 自動でスライド切り替え
      */}
            <Swiper
                modules={[Autoplay]} // ← Autoplayを有効化
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                autoplay={{ delay: 3000 }} // 3秒ごとに自動切替
            >
                {/* banners 配列を map で回してスライドを生成 */}
                {banners.map((src) => (
                    <SwiperSlide key={src}>
                        {/* Next.js Imageコンポーネントで画像を表示 */}
                        <Image
                            src={src} // 画像パス
                            alt="バナー画像" // 代替テキスト（アクセシビリティ用）
                            width={1200} // 画像の元サイズ（横）
                            height={400} // 画像の元サイズ（縦）
                            className="w-full h-auto object-cover rounded-lg"
                            /* Tailwind CSS クラス
                               w-full: 幅100%
                               h-auto: 高さ自動
                               object-cover: 枠いっぱいに画像を表示（比率維持）
                               rounded-lg: 角丸 */
                            priority // ページ読み込み時に優先表示
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}