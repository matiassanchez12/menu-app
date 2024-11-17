"use client";
import { User, LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";


export default function ActionSection({ session }: { session: any }) {
  return (
    <div className="flex gap-4">
      <Button
        variant="secondary"
        className={cn(!session ? "flex" : "hidden", "gap-2")}
        onClick={() => signIn()}
      >
        <User className="h-4 w-4" />
        Ingresar
      </Button>

      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>{session.user.name[0]}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn(session ? "flex" : "hidden", "gap-2")}
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: "/",
                })
              }
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
