"use client";

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon, X } from "lucide-react"
import MainHeaderNav from "./MainHeaderNav";
import { Button } from "../ui/button";
export default function MobileHeaderNav() {


    let Icon = <MenuIcon />;

    return (
        <Sheet onOpenChange={(open) => {
            Icon = open ? <X /> : <MenuIcon />;
        }}>
            <SheetTrigger asChild>
                <Button>

                    {Icon}
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="sr-only">Are you absolutely sure?</SheetTitle>
                    <SheetDescription className="sr-only">
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                    <MainHeaderNav />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
