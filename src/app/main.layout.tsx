import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <main className="w-screen h-screen">
            <Outlet />
        </main>
    )
}