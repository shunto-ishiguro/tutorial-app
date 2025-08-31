import Link from "next/link";

export default function Header() {
    const menuItems = [
        { name: "本体・グッズ", href: "/products" },
        { name: "ゲームソフト", href: "/games" },
        { name: "トピックス", href: "/topics" },
        { name: "キャラクター", href: "/characters" },
        { name: "サポート", href: "/support" },
    ];

    return (
        <header className="w-full bg-white shadow-md p-4 flex justify-center sm:justify-start gap-6">
            {menuItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-black font-medium"
                >
                    {item.name}
                </Link>
            ))}
        </header>
    );
}

