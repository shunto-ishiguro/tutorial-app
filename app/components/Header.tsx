import Link from "next/link";

export default function Header() {
    const menuItems = [
        { name: "トップ", href: "/" },
        { name: "使い方", href: "/guide" },
        { name: "お知らせ", href: "/news" },
        { name: "プランを立てる", href: "/plan" },
        { name: "サポート", href: "/support" },
    ];

    return (
        <header className="w-full bg-white shadow-md p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12">
            {/* サービス名 */}
            <div className="text-2xl font-bold text-blue-600">
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
