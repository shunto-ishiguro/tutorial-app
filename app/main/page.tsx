import Header from "../components/Header";
import Planner from "../components/Planner/Planner";

//今、最新のアプリのメイン画面
//ヘッダーとプラン作成画面のプランナーを設置している
export default function Page() {
    return (
        <div>
            <Header />
            <main className="min-h-screen p-8 bg-gray-50">
                <Planner />
            </main>
        </div>
    );
}