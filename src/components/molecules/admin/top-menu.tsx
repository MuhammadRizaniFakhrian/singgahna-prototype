"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atomics/dropdown-menu";
import Title from "@/components/atomics/title";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

function TopMenu() {
  const { data: session } = useSession();

  return (
    <header className="ml-auto flex w-fit max-w-full items-center justify-end rounded-[22px] bg-white px-5 py-3 shadow-[0_8px_24px_rgba(38,58,50,0.05)]">

      {/* User Profile */}
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="outline-none">
          <div className="flex items-center space-x-3">

            <Title
              title={session?.user?.name || "Pengguna"}
              section="header"
              reverse
            />

            <Image
              src="/images/avatar1.png"
              alt="Avatar pengguna"
              width={42}
              height={42}
              className="rounded-full"
            />

          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-[220px] space-y-3"
        >
          <DropdownMenuItem asChild>
            <Link href="/">
              Homepage
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-red-500 hover:!bg-[#FDF0EF]"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </header>
  );
}

export default TopMenu;
