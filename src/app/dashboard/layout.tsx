"use client";
import { Bell, Home, Menu, Package2, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { UserMenu } from "@/components/user-menu";
import { Comp_name } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function PayLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}

function Dashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const userType = useQuery(api.user.userType);
  if (userType === null) {
    return null;
  }

  if (userType === "twilio") {
    router.push("/worker");
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="">{Comp_name}</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => navItem({ ...item, is_mobile: false }))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">{Comp_name}</span>
                </Link>
                {navItems.map((item) => navItem({ ...item, is_mobile: true }))}
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserMenu />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">{"title"}</h1>
          </div>
          <div
            className="flex flex-1  rounded-lg border border-dashed shadow-sm"
            x-chunk="dashboard-02-chunk-1"
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

const navItems = [
  {
    href: "/dashboard",
    icon: <Home className="h-5 w-5" />,
    children: "Dashboard",
  },
  {
    href: "/dashboard/orders",
    icon: <ShoppingCart className="h-5 w-5" />,
    children: "Orders",
  },
];

function navItem({
  href,
  icon,
  children,
  is_mobile = false,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  is_mobile?: boolean;
}) {
  return (
    <Link
      key={href}
      href={href}
      className={cn(
        "flex items-center  px-3 py-2 hover:text-primary",
        is_mobile
          ? "mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
          : "text-muted-foreground transition-all rounded-lg gap-3"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

// Example usage:
<Link href="#" className="">
  <ShoppingCart className="h-5 w-5" />
  Orders
  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
    6
  </Badge>
</Link>;
