import AppHeader from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppSidebar />
            <main className="flex-1">
                <AppHeader />
                <div className="p-4">
                    {children}
                </div>
            </main>
        </>
    )
}