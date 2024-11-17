import Link from "next/link";
import Image from "next/image";
import DropdownChangeTheme from "./DropdownChangeTheme";
import { getServerAuthSession } from "~/server/auth";
import ActionSection from "./ActionSection";

export default async function NavBar() {
  const session = await getServerAuthSession();

  return (
    <header className="absolute z-10 w-full">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between bg-transparent px-6 py-4 sm:px-16">
        <Link href="/" className="flex items-center justify-center">
          <p>Menu Fast</p>
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>

        <div className="flex gap-4">
          <DropdownChangeTheme />

          <ActionSection session={session} />
        </div>
      </nav>
    </header>
  );
}
