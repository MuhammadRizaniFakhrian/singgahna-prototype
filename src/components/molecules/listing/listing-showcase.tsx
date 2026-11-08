
"use client";

import Title from "@/components/atomics/title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/atomics/carousel";
import CardDeals from "@/components/molecules/card/card-deals";
import { Listing } from "@/interfaces/listing";
import { useGetAllListingQuery } from "@/services/listing.service";

interface ListingShowcaseProps {
  id: string;
  title: string;
  subtitle: string;
}

function ListingShowcase({ id, title, subtitle }: ListingShowcaseProps) {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetAllListingQuery();

  const listingItems = response?.data?.data ?? [];

  return (
    <section
      id={id}
      className="px-10 xl:container xl:mx-auto pt-16 pb-[100px]"
    >
      <div className="flex justify-center text-center">
        <Title title={title} subtitle={subtitle} />
      </div>

      <Carousel className="w-full mt-[30px]">
        <CarouselContent>
          {isLoading && (
            <CarouselItem className="basis-full">
              <p className="text-center text-[#687568]">
                Memuat pilihan kos...
              </p>
            </CarouselItem>
          )}

          {isError && (
            <CarouselItem className="basis-full">
              <p className="text-center text-red-500">
                Gagal memuat listing: {JSON.stringify(error)}
              </p>
            </CarouselItem>
          )}

          {!isLoading && !isError && listingItems.length === 0 && (
            <CarouselItem className="basis-full">
              <p className="text-center text-[#687568]">
                Belum ada kos yang tersedia.
              </p>
            </CarouselItem>
          )}

          {!isLoading &&
            !isError &&
            listingItems.map((item: Listing, index: number) => (
              <CarouselItem key={item.id ?? index} className="basis-1/4">
                <CardDeals
                  image={item.attachments?.[0] || ""}
                  title={item.title}
                  slug={"/listing/" + item.slug}
                  price={item.price_per_day}
                  wide={item.sqft}
                  capacity={item.max_person}
                  wifi={item.wifi_speed}
                />
              </CarouselItem>
            ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default ListingShowcase;
