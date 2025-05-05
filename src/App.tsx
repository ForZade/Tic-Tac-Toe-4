import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import MainLayout from "./app/main.layout";
import HomePage from "./app/home.page";
import LobbyPage from "./app/Lobby/lobby.page";

export default function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="lobby/:code" element={<LobbyPage />} />
        </Route>
    ));

    return <RouterProvider router={router} />
}