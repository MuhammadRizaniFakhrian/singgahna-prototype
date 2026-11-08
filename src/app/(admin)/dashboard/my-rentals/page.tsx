
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Title from "@/components/atomics/title";
import { useGetTransactionsQuery } from "@/services/transaction.service";

interface RentalTransaction {
  id: number;
  start_date: string;
  end_date: string;
  total_days: number;
  total_price: number;
  status: "waiting" | "approved" | "canceled";
  listing: {
    id: number;
    title: string;
    slug: string;
    address: string;
    attachments?: string[];
    price_per_day: number;
  };
}

const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function formatDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

function getStatus(status: RentalTransaction["status"]) {
  const statuses = {
    waiting: {
      label: "Menunggu Persetujuan",
      className: "bg-[#F5EEDC] text-[#98752B]",
    },
    approved: {
      label: "Disetujui",
      className: "bg-[#E8EDDF] text-[#526746]",
    },
    canceled: {
      label: "Dibatalkan",
      className: "bg-[#FCE8E6] text-[#B42318]",
    },
  };

  return statuses[status] ?? statuses.waiting;
}

function MyRentals() {
  const [page, setPage] = useState(1);

  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useGetTransactionsQuery({ page });

  const rentals: RentalTransaction[] = response?.data?.data ?? [];
  const currentPage = response?.data?.current_page ?? page;
  const lastPage = response?.data?.last_page ?? 1;

  const storageBaseUrl =
    process.env.NEXT_PUBLIC_STORAGE_BASE_URL?.replace(/\/+$/, "");

  return (
    <main>
      {/* Page Heading */}
      <div>
        <Title
          section="admin"
          title="Penyewaan Saya"
          subtitle="Lihat dan pantau status penyewaan kos kamu di Singgahna."
        />
      </div>

      {/* Rental List */}
      <div className="mt-[30px] space-y-5">

        {isLoading && (
          <p className="py-8 text-center text-[#687568]">
            Memuat data penyewaan...
          </p>
        )}

        {isError && (
          <p className="py-8 text-center text-red-500">
            Gagal memuat data penyewaan.
            <span className="block mt-2 text-xs">
              {JSON.stringify(error)}
            </span>
          </p>
        )}

        {!isLoading && !isError && rentals.length === 0 && (
          <div className="rounded-3xl border border-[#E6E9E0] bg-white p-8 text-center">
            <div className="mb-3 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E8EDDF]">
                <span className="text-2xl">⌂</span>
              </div>
            </div>

            <h2 className="font-bold text-[#263A32]">
              Belum Ada Penyewaan
            </h2>

            <p className="mt-2 text-sm text-[#687568]">
              Kos yang kamu booking akan muncul di halaman ini.
            </p>

            <Link
              href="/#deals-section"
              className="mt-5 inline-flex rounded-xl bg-[#263A32] px-5 py-3 text-sm font-semibold text-white hover:bg-[#354C41]"
            >
              Cari Kos
            </Link>
          </div>
        )}

        {!isLoading &&
          !isError &&
          rentals.map((item) => {
            const listing = item.listing;
            const imagePath = listing?.attachments?.[0]?.trim().replace(/^\/+/, "");

            const imageSrc = imagePath
              ? /^https?:\/\//i.test(imagePath)
                ? imagePath
                : storageBaseUrl
                  ? `${storageBaseUrl}/${imagePath}`
                  : ""
              : "";

            const status = getStatus(item.status);

            return (
              <article
                key={item.id}
                className="rounded-3xl border border-[#E6E9E0] bg-white p-4 shadow-[0_8px_24px_rgba(38,58,50,0.05)]"
              >
                <div className="flex items-center gap-5">

                  {/* Listing Image */}
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={listing.title}
                      width={120}
                      height={100}
                      unoptimized
                      className="h-[100px] w-[120px] shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="h-[100px] w-[120px] shrink-0 rounded-2xl bg-[#E8EDDF]" />
                  )}

                  {/* Rental Information */}
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate font-bold text-[#263A32]">
                      {listing.title}
                    </h2>

                    <p className="mt-1 truncate text-sm text-[#687568]">
                      {listing.address}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#626D66]">
                      <span>
                        {formatDate(item.start_date)} – {formatDate(item.end_date)}
                      </span>

                      <span>
                        {item.total_days} hari
                      </span>
                    </div>
                  </div>

                  {/* Status and Price */}
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${status.className}`}>
                      {status.label}
                    </span>

                    <span className="font-bold text-[#263A32]">
                      {currencyFormat.format(item.total_price)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}

      </div>

      {/* Pagination */}
      {!isLoading && !isError && lastPage > 1 && (
        <div className="mt-[30px] flex items-center justify-center gap-4">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => setPage(currentPage - 1)}
            className="rounded-xl border border-[#E6E9E0] bg-white px-4 py-2 text-sm text-[#263A32] disabled:opacity-40"
          >
            Sebelumnya
          </button>

          <span className="text-sm text-[#526056]">
            {currentPage} / {lastPage}
          </span>

          <button
            type="button"
            disabled={currentPage >= lastPage}
            onClick={() => setPage(currentPage + 1)}
            className="rounded-xl border border-[#E6E9E0] bg-white px-4 py-2 text-sm text-[#263A32] disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      )}
    </main>
  );
}

export default MyRentals;
