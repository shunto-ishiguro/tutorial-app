import Link from "next/link";

export default function Header() {
    const menuItems = [
        { name: "トップ", href: "/" },
        { name: "使い方", href: "/guide" },
        { name: "お知らせ", href: "/news" },
        { name: "プランを立てる", href: "/plan" },
        { name: "設定", href: "/setting" },
    ];

    //flex flex-col sm:flex-row: スマホでは縦並び、PCでは横並び
    //sm:items-center: PCサイズで垂直方向中央揃え
    //gap-4 sm:gap-12: スマホでは隙間4、PCでは隙間12
    //max-w-6xl: コンテンツの最大幅を設定
    //mx-auto: 横方向中央寄せ
    //text-3xl: フォントサイズ
    //font-bold: 太字

    return (
        <header className="w-full bg-white shadow-md p-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 max-w-6xl mx-auto">
            {/* サービス名 */}
            <div className="text-3xl font-bold text-blue-600">
                サービス名
            </div>

            {/* メニュー */}
            <nav className="flex gap-6 flex-wrap sm:ml-auto">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-gray-700 hover:text-blue-500 font-semibold transition-colors duration-200"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
