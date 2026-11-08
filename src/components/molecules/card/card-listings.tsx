import Link from "next/link";
import { Button } from "@/components/atomics/button";
import Image from "next/image";

function CardListings({
  slug,
  image,
  title,
  location,
  wide,
  capacity,
  wifi,
}: {
  slug: string;
  image: string;
  title: string;
  location: string;
  wide: string;
  capacity: number;
  wifi: number;
}) {
  // Mengubah path attachment Laravel menjadi URL gambar
  const storageBaseUrl =
    process.env.NEXT_PUBLIC_STORAGE_BASE_URL?.replace(/\/+$/, "");

  const imagePath = image?.trim().replace(/^\/+/, "");

  const imageSrc = imagePath
    ? /^https?:\/\//i.test(imagePath)
      ? imagePath
      : storageBaseUrl
        ? `${storageBaseUrl}/${imagePath}`
        : ""
    : "";

  return (
    <figure className="flex items-center justify-between gap-4 rounded-3xl border border-[#E6E9E0] bg-white p-4 shadow-[0_8px_24px_rgba(38,58,50,0.05)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(38,58,50,0.10)]">

      {/* Listing Information */}
      <div className="flex min-w-0 items-center space-x-4">

        {/* Listing Image */}
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={title}
            width={120}
            height={90}
            unoptimized
            className="h-[90px] w-[120px] shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <div className="h-[90px] w-[120px] shrink-0 rounded-2xl bg-[#E8EDDF]" />
        )}

        {/* Listing Details */}
        <div className="min-w-0">
          <h2 className="truncate font-bold leading-8 text-[#263A32]">
            {title}
          </h2>

          <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2.5">

            <div className="flex items-center text-sm font-medium leading-[21px] text-[#626D66]">
              <Image
                src="/icons/location-dark.svg"
                alt="location"
                width={20}
                height={20}
                className="mr-1 h-5 w-5"
              />
              {location}
            </div>

            <div className="flex items-center text-sm font-medium leading-[21px] text-[#626D66]">
              <Image
                src="/icons/format-square-dark.svg"
                alt="area"
                width={20}
                height={20}
                className="mr-1 h-5 w-5"
              />
              {wide} m²
            </div>

            <div className="flex items-center text-sm font-medium leading-[21px] text-[#626D66]">
              <Image
                src="/icons/profile-2user-dark.svg"
                alt="capacity"
                width={20}
                height={20}
                className="mr-1 h-5 w-5"
              />
              {capacity} orang
            </div>

            <div className="flex items-center text-sm font-medium leading-[21px] text-[#626D66]">
              <Image
                src="/icons/wifi-dark.svg"
                alt="wifi"
                width={20}
                height={20}
                className="mr-1 h-5 w-5"
              />
              {wifi} Mbps
            </div>

          </div>
        </div>
      </div>

            {/* Preview Button */}
      <div className="flex shrink-0 items-center">
        <Link
          href={`/listing/${slug}`}
          className="inline-flex items-center justify-center rounded-xl border border-[#E6E9E0] bg-[#F5F2E9] px-5 py-2.5 text-sm font-semibold text-[#263A32] transition-colors hover:bg-[#E8EDDF]"
        >
          Pratinjau
        </Link>
      </div>
    </figure>
  );
}

export default CardListings;
