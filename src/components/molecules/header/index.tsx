
'use client'

import { Button } from '@/components/atomics/button'
import Image from 'next/image'
import Link from 'next/link'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/atomics/dropdown-menu'
import Title from '@/components/atomics/title'
import { signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'

function Header() {
    const { data: session } = useSession();
    const pathname = usePathname();

    return (
      <header className="container mx-auto fixed inset-x-0 top-[30px] z-20">
        <div className="px-[30px] py-[16px] rounded-[30px] bg-white border border-[#E6E9E0] shadow-[0px_10px_30px_rgba(38,58,50,0.08)] flex justify-between items-center">

          {/* Logo */}
          <Link
            href="/"
            aria-label="Kembali ke halaman utama"
            onClick={(event) => {
              if (pathname === '/') {
                event.preventDefault();

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }
            }}
          >
            <Image
              src="/images/singgahna2.png"
              alt="Singgahna"
              height={72}
              width={90}
              priority
            />
          </Link>

          {/* Navigation */}
          <nav>
            <ul className="flex items-center space-x-[30px]">
              <li
                className="cursor-pointer font-semibold leading-6 text-[#263A32] hover:text-[#8A9B76] transition-colors duration-200"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Home
              </li>

              <li
                className="cursor-pointer font-semibold leading-6 text-[#263A32] hover:text-[#8A9B76] transition-colors duration-200"
                onClick={() => {
                  const section = document.getElementById("deals-section");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Listing
              </li>

              <li
                className="cursor-pointer font-semibold leading-6 text-[#263A32] hover:text-[#8A9B76] transition-colors"
              >
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("review-section")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                >
                  Reviews
                </button>
              </li>
            </ul>
          </nav>

          {/* Login & Register */}
          <div
            data-login={!!session?.user}
            className="data-[login=true]:hidden data-[login=false]:flex items-center space-x-3"
          >
            <Button
              variant="secondary"
              size="header"
              className="!bg-white !text-[#263A32] !border !border-[#DCE2D5] hover:!bg-[#F5F2E9] transition-colors"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>

            <Button
              variant="default"
              size="header"
              className="!bg-[#263A32] !text-white hover:!bg-[#354D42] shadow-[0px_8px_18px_rgba(38,58,50,0.18)] transition-colors"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>

          {/* User Dropdown */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger
              data-login={!!session?.user}
              className="data-[login=false]:hidden outline-none"
            >
              <div className="flex items-center space-x-2">
                <Title title={session?.user.name} section="header" />

                <Image
                  src="/images/avatar1.png"
                  alt="avatar"
                  height={48}
                  width={48}
                  className="rounded-full"
                />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[240px] mr-8 space-y-4 bg-white border border-[#E6E9E0] shadow-lg">
              <DropdownMenuItem className="cursor-pointer hover:!bg-[#F5F2E9]">
                <Link href={"/dashboard"}>Dashboard</Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => signOut()}
                className="cursor-pointer text-red-500"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </header>
    );
}

export default Header
