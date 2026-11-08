
import Image from 'next/image'

function Footer() {
  return (
    <footer className="border-t border-[#8A9B76]/30 bg-[#263A32]">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-4">
            <div className="flex h-[64px] w-[84px] items-center justify-center rounded-xl bg-[#F5F2E9]">
              <Image
                src="/images/singgahna2.png"
                alt="Singgahna"
                width={76}
                height={60}
                className="h-[60px] w-[76px] object-contain"
              />
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-white">
                Tempat nyaman untuk memulai cerita.
              </span>
              <span className="text-xs text-[#C7D2C2]">
                Temukan kos impianmu bersama Singgahna.
              </span>
            </div>
          </div>

          {/* Copyright */}
          <span className="text-right text-sm leading-6 text-[#E8EDDF]">
            © {new Date().getFullYear()} Singgahna. Hak cipta dilindungi.
          </span>

        </div>
      </div>
    </footer>
  )
}

export default Footer