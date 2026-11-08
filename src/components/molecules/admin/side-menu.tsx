
import Image from "next/image";
import ItemMenu from "./item-menu";
import Link from "next/link";

function SideMenu() {
  return (
    <nav className="bg-white w-full max-w-[250px] px-6 py-[30px] rounded-[20px] h-fit">

      {/* Brand Logo */}
      <Link 
      href="/"
      className="flex w-full justify-center"
      >
        <Image
          src="/images/singgahna2.png"
          alt="singgahna"
          height={50}
          width={133}
          className="object-contain"
        />
      </Link>

      {/* Main Menu */}
      <div className="mt-[37.5px]">

        <ul className="mt-3.5 flex flex-col space-y-6">

          <ItemMenu
            image="/icons/card.svg"
            title="Dashboard"
            url="/dashboard"
          />

          <ItemMenu
            image="/icons/building.svg"
            title="Penyewaan Saya"
            url="/dashboard/my-rentals"
          />

        </ul>
      </div>

    </nav>
  );
}

export default SideMenu;
