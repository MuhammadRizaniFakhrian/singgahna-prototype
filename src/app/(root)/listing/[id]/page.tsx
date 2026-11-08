"use client";
import { useParams } from "next/navigation";
import Breadcrumbs from "@/components/molecules/breadcrumbs";
import CardFacility from "@/components/molecules/card/card-facility";
import CardStar from "@/components/molecules/card/card-star";
import { Badge } from "@/components/atomics/badge";
import Title from "@/components/atomics/title";
import Image from "next/image";
import ListingShowcase from "@/components/molecules/listing/listing-showcase";
import PhotoGallery from "./photo-gallery";
import BookingSection from "./booking-section";
import CustomerReviews from "./customer-reviews";
import { useGetDetailListingQuery } from "@/services/listing.service";
import { useMemo } from "react";
import { Listing } from "@/interfaces/listing";

function Detail() {
  const params = useParams<{ id: string }>();
  const { data } = useGetDetailListingQuery(params.id);
  
  const listing: Listing | undefined = useMemo(() => data?.data, [data]);
  
  return (
    <main>
      <section
        id="overview-section"
        className="bg-gray-light pt-[170px] pb-[50px]"
      >
        <div className="px-10 xl:container xl:mx-auto">
          <Breadcrumbs />

          {listing?.attachments && <PhotoGallery photos={listing.attachments} />}

          <div className="mt-[30px] grid grid-cols-3 xl:grid-cols-4 gap-x-5">
            <div className="col-span-2 xl:col-span-3 space-y-5 pr-[50px]">
              <Badge>Unggulan</Badge>

              <div className="flex items-center justify-between">
                <h1 className="font-bold text-[32px] leading-[48px] text-secondary max-w-[300px]">
                  {listing?.title}
                </h1>

                <div className="flex flex-col items-end text-end">
                  <CardStar rating={4} variant="detail" />
                  <span className="mt-2 font-semibold leading-6 text-secondary">
                    4/5 (40)
                  </span>
                </div>
              </div>
              
              
              <div className="space-y-4">

                {/* Alamat Kos */}
                <div className="flex items-start gap-2 font-medium text-sm text-[#263A32]">
                  <Image
                    src="/icons/location-dark.svg"
                    alt="Lokasi"
                    width={20}
                    height={20}
                    className="shrink-0"
                  />
                  <span>{listing?.address}</span>
                </div>

                {/* Spesifikasi Kos - 2 Kolom */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">

                  {/* Luas */}
                  <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
                    <Image
                      src="/icons/format-square-dark.svg"
                      alt="Luas kamar"
                      width={20}
                      height={20}
                    />
                    <span>{listing?.sqft} m²</span>
                  </div>

                  {/* Kapasitas */}
                  <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
                    <Image
                      src="/icons/profile-2user-dark.svg"
                      alt="Kapasitas"
                      width={20}
                      height={20}
                    />
                    <span>{listing?.max_person} orang</span>
                  </div>

                  {/* Wi-Fi */}
                  <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
                    <Image
                      src="/icons/wifi-dark.svg"
                      alt="Wi-Fi"
                      width={20}
                      height={20}
                    />
                    <span>{listing?.wifi_speed} Mbps</span>
                  </div>

                  {/* Kamar Mandi */}
                  <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
                    <Image
                      src="/icons/bathroom.svg"
                      alt="Kamar mandi"
                      width={20}
                      height={20}
                    />
                    <span>
                      {listing?.bathroom_type === "Luar"
                        ? "Kamar Mandi Luar"
                        : listing?.bathroom_type === "Dalam"
                          ? "Kamar Mandi Dalam"
                          : listing?.bathroom_type}
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section
        id="about-booking-section"
        className="px-10 xl:container xl:mx-auto py-[50px] flex space-x-8 xl:space-x-[80px]"
      >
        <div className="w-full max-w-[600px] xl:max-w-[650px] space-y-[30px]">
          <Title
            section="detail"
            title="Tentang Kos"
            subtitle={listing?.description}
          />
          
        <div className="grid grid-cols-2 gap-5">

          {listing?.washing_machine_available && (
            <CardFacility
              icon="/icons/washing-machine.svg"
              title="Mesin Cuci"
              subtitle="Tersedia"
            />
          )}

          {listing?.kitchen_available && (
            <CardFacility
              icon="/icons/kitchen.svg"
              title="Dapur"
              subtitle="Lengkap"
            />
          )}

          {listing?.parking_area && (
            <CardFacility
              icon="/icons/parking.svg"
              title="Area Parkir"
              subtitle="Tersedia"
            />
          )}

          {listing?.clothesline_available && (
            <CardFacility
              icon="/icons/clothesline.svg"
              title="Area Jemuran"
              subtitle="Tersedia"
            />
          )}

        </div>

          <CustomerReviews />
        </div>
        {listing && (
          <BookingSection id={listing?.id} slug={listing?.slug} price={listing?.price_per_day}/>
        )}
      </section>

      <ListingShowcase
        id="deals-section"
        title="Rekomendasi Kos Lainnya"
        subtitle="Kos-kos pilihan lain yang bisa kamu pertimbangkan."
      />
    </main>
  );
}

export default Detail;
