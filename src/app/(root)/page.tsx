import CardIndicator from "@/components/molecules/card/card-indicator";
import { Separator } from "@/components/atomics/separator";
import Title from "@/components/atomics/title";
import CardBenefit from "@/components/molecules/card/card-benefit";
import CardPurpose from "@/components/molecules/card/card-purpose";
import CardReview from "@/components/molecules/card/card-review";
import ListingShowcase from "@/components/molecules/listing/listing-showcase";
import ExploreButton from "@/components/atomics/explore-button";

function Home() {
  return (
    <main>
      <section
        id="hero-section"
        className="relative isolate overflow-hidden bg-[#F5F2E9] min-h-[650px] max-h-[650px] xl:min-h-[700px] xl:max-h-[700px]"
      >
        {/* Background Image - Right Side Only */}
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 z-0 hidden w-1/2 bg-[url('/images/hero-kos2.jpg')] bg-cover bg-center bg-no-repeat lg:block"
        >
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F5F2E9] to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 pt-[190px] container mx-auto">
          <div className="max-w-[480px]">

            <h1 className="text-[38px] xl:text-[42px] font-bold leading-[1.2] tracking-tight text-[#263A32]">
              <span className="block">Temukan Kos Nyaman</span>
              <span className="block">
                yang{" "}
                <span className="text-[#8A9B76]">
                  Bikin Betah
                </span>
              </span>
            </h1>

            <p className="mt-5 max-w-[450px] text-[16px] xl:text-[17px] leading-7 text-[#626D66]">
              Jelajahi pilihan kos dengan fasilitas lengkap,
              lokasi strategis, dan suasana nyaman sesuai kebutuhanmu.
            </p>

            <div className="pt-[32px]">
              <ExploreButton />
            </div>

          </div>
        </div>
      </section>

      <section
        id="indicator-section"
        className="relative z-10 px-10 xl:container xl:mx-auto -mt-16 pb-9"
      >
        <div className="h-[128px] flex justify-center xl:justify-between items-center space-x-6 xl:space-x-12 bg-white shadow-indicator rounded-[20px] px-9 py-5 xl:px-[50px] xl:py-[29px]">
          <CardIndicator
            icon="/icons/house-2.svg"
            title="5"
            subtitle="Kos Tersedia"
            variant="indicator"
          />
          <Separator orientation="vertical" className="bg-separator" />
          <CardIndicator
            icon="/icons/people-2.svg"
            title="8/10"
            subtitle="Penyewa Puas"
            variant="indicator"
          />
          <Separator orientation="vertical" className="bg-separator" />
          <CardIndicator
            icon="/icons/security-user.svg"
            title="100%"
            subtitle="Keamanan"
            variant="indicator"
          />
          <Separator orientation="vertical" className="bg-separator" />
          <CardIndicator
            icon="/icons/global.svg"
            title="1"
            subtitle="Kota"
            variant="indicator"
          />
        </div>
      </section>

      <ListingShowcase
        id="deals-section"
        title="Pilihan Kos Terbaik"
        subtitle="Temukan kos nyaman dengan fasilitas lengkap dan harga terjangkau."
      />

      <section
        id="benefits-section"
        className="px-10 xl:container xl:mx-auto mt-[100px]"
      >
        <div className="flex justify-between gap-4">  
          <div className="max-w-[320px] xl:max-w-[383px]">
            <h1 className="font-bold text-[28px] leading-[42px] max-w-[350px] text-[#263A32]">
              Kelebihan yang Membuat Nyaman
            </h1>

            <p className="mt-4 max-w-[380px] text-base leading-[26px] text-[#626D66]">
              Singgahna membantu kamu menemukan kos sesuai kebutuhan,
              dengan informasi yang jelas dan proses pemesanan
              yang lebih praktis.
            </p>

            <ul className="mt-[24px] space-y-5">
              <CardBenefit benefit="Cari kos sesuai kebutuhan dan lokasi" />
              <CardBenefit benefit="Lihat harga dan fasilitas secara jelas" />
              <CardBenefit benefit="Periksa ketersediaan sebelum booking" />
              <CardBenefit benefit="Pesan kos secara online" />
              <CardBenefit benefit="Pembayaran melalui sistem terintegrasi" />
            </ul>
          </div>
          <div className="max-w-[650px] grid grid-cols-2 gap-6 xl:gap-[30px]">
            <CardPurpose
              image="/images/benefit1.jpg"
              title="Kos Nyaman untuk Mahasiswa"
              purpose="5"
            />
            <CardPurpose
              image="/images/benefit2.jpg"
              title="Kos Strategis Dekat Kampus"
              purpose="5"
            />
            <CardPurpose
              image="/images/benefit3.jpg"
              title="Kos Modern & Cozy"
              purpose="2"
            />
            <CardPurpose
              image="/images/benefit4.jpg"
              title="Kos Lengkap Fasilitas"
              purpose="2"
            />
          </div>
        </div>
      </section>

      <section id="review-section" className="container mx-auto my-[100px]">
        <div className="flex justify-center text-center">
          <Title
            title="Penyewa Puas"
            subtitle={`Mereka nyaman dan betah tinggal di kos kami.`}
            section=""
          />
        </div>
        <div className="mt-[30px] grid grid-cols-3 gap-[30px]">
          <div className="space-y-[30px]">
            <CardReview
              rating={4}
              review="Kosnya nyaman, bersih, dan dekat dengan kampus. Betah banget tinggal di sini!"
              avatar="/images/avatar1.png"
              username="Yono"
              jobdesk="Mahasiswa"
            />
          </div>
          <div className="space-y-[30px]">
            <CardReview
              rating={5}
              review="Fasilitas lengkap dan internet cepat. Tempatnya aman dan tenang untuk belajar."
              avatar="/images/avatar2.png"
              username="Yanto"
              jobdesk="Mahasiswa"
            />
          </div>
          <div className="space-y-[30px]">
            <CardReview
              rating={4}
              review="Pelayanan pemilik kos ramah, kamar cozy, dan harganya terjangkau. Sangat puas!"
              avatar="/images/avatar3.png"
              username="Yanti"
              jobdesk="Mahasiswa"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home