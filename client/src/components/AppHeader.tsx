import { Badge } from "./ui/badge";
import { SidebarTrigger } from "./ui/sidebar";

// const ADDRESS = "E & B Farm, Sitio 5, San Teodoro"

export default function AppHeader() {
    return <div className="border-b-1 p-3 flex justify-between items-center">
        <SidebarTrigger />
        <div className="flex items-center justify-center gap-2">
            {/* <div>
                <p className="text-xs">
                    {ADDRESS}
                </p>
            </div> */}
            {/* <Badge variant="default">
                <MapPinIcon />
                {ADDRESS}
            </Badge> */}
            <Badge variant="secondary">
                {new Date().toDateString()}
            </Badge>
            {/* <ThemeToggle /> */}
        </div>
    </div>
}