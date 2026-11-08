
import CardFacility from "@/components/molecules/card/card-facility";
import { Listing as ListingInterface } from "@/interfaces/listing";
import Image from "next/image";

function Listing({ listing }: { listing: ListingInterface }) {
  // URL gambar dari Laravel Storage
  const storageBaseUrl =
    process.env.NEXT_PUBLIC_STORAGE_BASE_URL?.replace(/\/+$/, "");

  const imagePath = listing.attachments?.[0]
    ?.trim()
    .replace(/^\/+/, "");

  const imageSrc = imagePath
    ? /^https?:\/\//i.test(imagePath)
      ? imagePath
      : storageBaseUrl
        ? `${storageBaseUrl}/${imagePath}`
        : ""
    : "";

  // Terjemahan tipe kamar mandi
  const bathroomType = listing.bathroom_type?.trim().toLowerCase();

  const bathroomLabel = bathroomType?.includes("luar")
    ? "Kamar Mandi Luar"
    : bathroomType?.includes("dalam")
      ? "Kamar Mandi Dalam"
      : listing.bathroom_type;

  return (
    <div className="w-full max-w-[460px] h-fit p-[30px] space-y-5 bg-white rounded-[30px] shadow-indicator border border-border">

      {/* Listing Image */}
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={listing.title}
          height={220}
          width={400}
          unoptimized
          className="w-full h-[220px] rounded-[24px] object-cover"
        />
      ) : (
        <div className="w-full h-[220px] rounded-[24px] bg-[#F5F2E9]" />
      )}

      {/* Listing Title */}
      <h1 className="font-bold text-[22px] leading-[33px] text-[#263A32]">
        {listing.title}
      </h1>

      {/* Listing Information */}
      <div className="space-y-4">

        {/* Address */}
        <div className="flex items-start gap-2 text-sm font-medium leading-6 text-[#263A32]">
          <Image
            src="/icons/location-dark.svg"
            alt="Lokasi"
            width={20}
            height={20}
            className="mt-0.5 shrink-0"
          />
          <span>{listing.address}</span>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">

          {/* Area */}
          <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
            <Image
              src="/icons/format-square-dark.svg"
              alt="Luas kamar"
              width={20}
              height={20}
            />
            <span>{listing.sqft} m²</span>
          </div>

          {/* Capacity */}
          <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
            <Image
              src="/icons/profile-2user-dark.svg"
              alt="Kapasitas"
              width={20}
              height={20}
            />
            <span>{listing.max_person} orang</span>
          </div>

          {/* Wi-Fi */}
          <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
            <Image
              src="/icons/wifi-dark.svg"
              alt="Kecepatan Wi-Fi"
              width={20}
              height={20}
            />
            <span>{listing.wifi_speed} Mbps</span>
          </div>

          {/* Bathroom */}
          <div className="flex items-center gap-2 text-sm font-medium text-[#263A32]">
            <Image
              src="/icons/bathroom.svg"
              alt="Kamar mandi"
              width={20}
              height={20}
            />
            <span>{bathroomLabel}</span>
          </div>

        </div>
      </div>

      {/* Facilities */}
      <div className="space-y-3.5">

        {listing.washing_machine_available && (
          <CardFacility
            icon="/icons/washing-machine.svg"
            title="Mesin Cuci"
            subtitle="Tersedia"
          />
        )}

        {listing.kitchen_available && (
          <CardFacility
            icon="/icons/kitchen.svg"
            title="Dapur"
            subtitle="Lengkap"
          />
        )}

        {listing.parking_area && (
          <CardFacility
            icon="/icons/parking.svg"
            title="Area Parkir"
            subtitle="Aman"
          />
        )}

        {listing.clothesline_available && (
          <CardFacility
            icon="/icons/clothesline.svg"
            title="Area Jemuran"
            subtitle="Tersedia"
          />
        )}

      </div>
    </div>
  );
}

export default Listing;