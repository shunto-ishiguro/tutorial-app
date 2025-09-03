import Link from "next/link";

export default function Header() {
    const menuItems = [
        { name: "トップ", href: "/" },
        { name: "使い方", href: "/guide" },
        { name: "プランを立てる", href: "/main" },
    ];

    return (
        <header className="w-full bg-white shadow-md p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-12 max-w-6xl mx-auto">
            {/* サービス名 */}
            <div className="text-2xl sm:text-3xl font-bold text-blue-600">
                サービス名
            </div>

            {/* メニュー */}
            <nav className="flex gap-4 sm:gap-6 sm:ml-auto overflow-x-auto whitespace-nowrap scrollbar-hide">
                {menuItems.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="px-2 py-1 text-gray-700 
                                   hover:text-blue-500 
                                   focus:text-blue-500 
                                   focus-visible:text-blue-500 
                                   active:text-blue-600 
                                   font-semibold 
                                   transition-colors duration-200"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
