
import { DealsProps } from "@/interfaces/landing-page";
import { moneyFormat } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

function CardDeals({
  image,
  title,
  slug,
  price,
  wide,
  capacity,
  wifi,
}: DealsProps) {
  return (
    <Link href={slug} className="group block">
      <figure className="relative overflow-hidden rounded-3xl border border-[#E6E9E0] bg-[#E8EDDF] shadow-[0_8px_24px_rgba(38,58,50,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_30px_rgba(38,58,50,0.14)]">

        {/* Listing Image */}
        {image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${image}`}
            alt={title}
            height={0}
            width={0}
            className="h-[310px] w-[220px] rounded-3xl bg-[#E8EDDF] object-cover transition-transform duration-500 group-hover:scale-[1.03] xl:h-[350px] xl:w-[260px]"
            unoptimized
          />
        ) : (
          <div className="h-[310px] w-[220px] rounded-3xl bg-[#E8EDDF] xl:h-[350px] xl:w-[260px]" />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 flex h-[310px] w-[220px] flex-col rounded-3xl bg-gradient-to-t from-[#263A32]/95 via-[#263A32]/30 to-transparent p-5 text-white xl:h-[350px] xl:w-[260px]">

          {/* Listing Information */}
          <div className="mt-auto">

            {/* Title, Price & Rating */}
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="block truncate text-xl font-bold leading-[30px] drop-shadow-sm">
                  {title}
                </span>

                <span className="block text-sm leading-[21px]">
                  <span className="font-semibold">
                    {moneyFormat.format(price)}
                  </span>
                  /hari
                </span>
              </div>

              <div className="flex shrink-0 items-center text-sm leading-[21px]">
                <Image
                  src="/icons/star2.svg"
                  alt="star-icon"
                  height={0}
                  width={0}
                  className="mr-[0.5px] -mt-1 h-5 w-5"
                />
                4/5
              </div>
            </div>

            {/* Facilities */}
            <div className="mt-[14px] flex items-center justify-between gap-2">

              <div className="flex items-center text-sm leading-[21px]">
                <Image
                  src="/icons/format-square.svg"
                  alt="square-icon"
                  height={0}
                  width={0}
                  className="mr-1 h-5 w-5"
                />
                {wide} m²
              </div>

              <div className="flex items-center text-sm leading-[21px]">
                <Image
                  src="/icons/profile-2user.svg"
                  alt="profile-icon"
                  height={0}
                  width={0}
                  className="mr-1 h-5 w-5"
                />
                {capacity} orang
              </div>

              <div className="flex items-center text-sm leading-[21px]">
                <Image
                  src="/icons/wifi.svg"
                  alt="wifi-icon"
                  height={0}
                  width={0}
                  className="mr-1 h-5 w-5"
                />
                {wifi} Mbps
              </div>

            </div>
          </div>
        </div>
      </figure>
    </Link>
  );
}

export default CardDeals;
