import Header from "../components/Header";
import Planner from "../components/Planner/Planner";

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