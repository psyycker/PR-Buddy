import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import "./styles.css";
import Home from "./routes/home";
import Settings from "./routes/settings";
import {PullRequestsContextProvider} from "./contexts/pull-requests-context.tsx";
import {initPermissions} from "./utils/notifications.ts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/settings",
        element: <Settings/>
    }
]);
initPermissions();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <PullRequestsContextProvider>
            <RouterProvider router={router}/>
        </PullRequestsContextProvider>
    </React.StrictMode>,
);
