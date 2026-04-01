import ThemeToggle from "./ThemeToggle";
import { SidebarTrigger } from "./ui/sidebar";

export default function AppHeader() {
    return <div className="border-b-1 p-3 flex justify-between items-center">
        <SidebarTrigger />
        <ThemeToggle />
    </div>
}