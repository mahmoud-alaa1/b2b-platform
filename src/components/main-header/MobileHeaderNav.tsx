"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MenuIcon, X, } from "lucide-react"
import MainHeaderNav from "./MainHeaderNav";
import { Button } from "../ui/button";
import { useState } from "react";
export default function MobileHeaderNav() {


    let Icon = <MenuIcon />;

    const [open, setOpen] = useState(false);

    return (
        <Sheet open={open} onOpenChange={(open) => {
            Icon = open ? <X /> : <MenuIcon />;
            setOpen(open);
        }}>
            <SheetTrigger asChild>
                <Button>
                    {Icon}
                </Button>
            </SheetTrigger>
            <SheetContent className="h-[100dvh] overflow-auto">
                <SheetHeader>
                    <SheetTitle className="sr-only">قائمة التنقل</SheetTitle>
                    <SheetDescription className="sr-only">
                        استخدم القائمة أدناه للتنقل في التطبيق.
                    </SheetDescription>
                    <MainHeaderNav closeSheet={() => setOpen(false)} />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
