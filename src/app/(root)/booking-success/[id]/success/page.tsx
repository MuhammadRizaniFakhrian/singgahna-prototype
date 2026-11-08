
"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetDetailTransactionQuery } from "@/services/transaction.service";
import { PAYMENT_INFO } from "@/lib/payment-info";
import { useToast } from "@/components/atomics/use-toast";
import { Button } from "@/components/atomics/button";
import { Separator } from "@/components/atomics/separator";
import { useParams } from "next/navigation";
import moment from "moment";

const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function formatDate(date?: string) {
  if (!date) return "-";

  const [year, month, day] = date
    .slice(0, 10)
    .split("-")
    .map(Number);

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, month - 1, day));
}

const statusConfig = {
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

function BookingSuccess() {
  const params = useParams<{ id: string }>();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetDetailTransactionQuery(params.id);

  const booking = response?.data;
  const listing = booking?.listing;

  const { toast } = useToast();

  const storageBaseUrl =
    process.env.NEXT_PUBLIC_STORAGE_BASE_URL?.replace(/\/+$/, "");

  const imagePath = listing?.attachments?.[0]
    ?.trim()
    .replace(/^\/+/, "");

  const imageSrc = imagePath
    ? /^https?:\/\//i.test(imagePath)
      ? imagePath
      : storageBaseUrl
        ? `${storageBaseUrl}/${imagePath}`
        : ""
    : "";

  const currentStatus =
    statusConfig[booking?.status as keyof typeof statusConfig] ??
    statusConfig.waiting;

  // Copy confirmation message
  const handleCopyMessage = async () => {
    if (!booking || !listing) return;

    const message = [
      "Halo Admin Singgahna,",
      "",
      "Saya ingin mengonfirmasi pengajuan penyewaan kos.",
      "",
      `Kode Booking: #${booking.id}`,
      `Nama Kos: ${listing.title}`,
      `Tanggal Mulai: ${formatDate(booking.start_date)}`,
      `Tanggal Selesai: ${formatDate(booking.end_date)}`,
      `Total Pembayaran: ${currencyFormat.format(Number(booking.total_price))}`,
      "",
      "Saya telah melakukan simulasi pembayaran dan ingin mengonfirmasi transaksi ini.",
      "Bukti pembayaran akan saya lampirkan.",
      "",
      "Terima kasih.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(message);

      toast({
        title: "Pesan berhasil disalin",
        description: "Silakan tempel pesan tersebut ke WhatsApp Admin.",
      });
    } catch {
      toast({
        title: "Gagal menyalin pesan",
        description: "Silakan coba kembali.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen grid place-items-center bg-gray-light">
        <p className="text-[#626D66]">
          Memuat informasi penyewaan...
        </p>
      </main>
    );
  }

  if (isError || !booking) {
    return (
      <main className="min-h-screen grid place-items-center bg-gray-light">
        <div className="text-center">
          <h1 className="font-bold text-xl text-[#263A32]">
            Booking tidak ditemukan
          </h1>

          <Link
            href="/"
            className="mt-4 inline-block text-[#8A9B76]"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-gray-light min-h-screen">

      {/* Success Heading */}
      <section className="pt-[165px] pb-[130px] px-5">
        <div className="container mx-auto flex justify-center">
          <div className="max-w-[500px] text-center">

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E8EDDF]">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#526746"
                strokeWidth="2"
                className="h-9 w-9"
              >
                <path
                  d="M20 6L9 17l-5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="font-bold text-[30px] leading-[42px] text-[#263A32]">
              Booking Berhasil Diajukan!
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#687568]">
              Terima kasih telah memilih Singgahna.
              Permintaan penyewaan kamu berhasil dikirim.
            </p>

          </div>
        </div>
      </section>

      {/* Booking Detail Card */}
      <section className="container mx-auto max-w-[700px] px-5 -mt-[85px] pb-[100px]">

        <div className="rounded-[30px] border border-[#E6E9E0] bg-white p-6 md:p-[30px] shadow-[0_8px_24px_rgba(38,58,50,0.05)] space-y-6">

          {/* Listing Information */}
          <div className="flex items-center gap-5">

            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={listing?.title || "Listing"}
                width={130}
                height={100}
                unoptimized
                className="h-[100px] w-[130px] shrink-0 rounded-2xl object-cover"
              />
            ) : (
              <div className="h-[100px] w-[130px] shrink-0 rounded-2xl bg-[#F5F2E9]" />
            )}

            <div className="min-w-0 space-y-2">
              <h2 className="font-bold text-xl text-[#263A32]">
                {listing?.title}
              </h2>

              <span
                className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold ${currentStatus.className}`}
              >
                {currentStatus.label}
              </span>
            </div>
          </div>

          <Separator className="bg-[#E6E9E0]" />

          {/* Booking Details */}
          <div className="space-y-4">

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#687568]">
                Kode Booking
              </span>
              <span className="font-semibold text-[#263A32]">
                #{booking.id}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#687568]">
                Tanggal Mulai
              </span>
              <span className="font-semibold text-[#263A32] text-right">
                {formatDate(booking.start_date)}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#687568]">
                Tanggal Selesai
              </span>
              <span className="font-semibold text-[#263A32] text-right">
                {formatDate(booking.end_date)}
              </span>
            </div>

            <div className="flex justify-between gap-4 text-sm">
              <span className="text-[#687568]">
                Durasi Penyewaan
              </span>
              <span className="font-semibold text-[#263A32]">
                {booking.total_days} hari
              </span>
            </div>

          </div>

          <Separator className="bg-[#E6E9E0]" />

          {/* Payment Information */}
          <div className="space-y-4">

            <h2 className="font-bold text-lg text-[#263A32]">
              Informasi Pembayaran
            </h2>

            <div className="rounded-2xl border border-[#E6E9E0] bg-white p-5 space-y-4">

              <span className="text-xs font-bold text-[#8A9B76]">
                REKENING SIMULASI
              </span>

              <div>
                <p className="text-sm text-[#687568]">
                  Nama Bank
                </p>
                <p className="font-bold text-[#263A32]">
                  {PAYMENT_INFO.bankName}
                </p>
              </div>

              <Separator className="bg-[#E6E9E0]" />

              <div>
                <p className="text-sm text-[#687568]">
                  Nomor Rekening
                </p>
                <p className="text-xl font-bold tracking-wide text-[#263A32]">
                  {PAYMENT_INFO.accountNumber}
                </p>
              </div>

              <Separator className="bg-[#E6E9E0]" />

              <div>
                <p className="text-sm text-[#687568]">
                  Atas Nama
                </p>
                <p className="font-bold text-[#263A32]">
                  {PAYMENT_INFO.accountHolder}
                </p>
              </div>

            </div>

            <div className="flex justify-between items-center gap-3 rounded-xl bg-[#F5F2E9] p-4">
              <span className="text-sm font-medium text-[#626D66]">
                Total Pembayaran
              </span>

              <span className="font-bold text-lg text-[#263A32]">
                {currencyFormat.format(Number(booking.total_price))}
              </span>
            </div>

          </div>

          {/* WhatsApp Confirmation */}
          {booking.status === "waiting" && (
            <>
              <Separator className="bg-[#E6E9E0]" />

              <div className="space-y-4">

                <h2 className="font-bold text-lg text-[#263A32]">
                  Konfirmasi Pembayaran
                </h2>

                <p className="text-sm leading-6 text-[#687568]">
                  Setelah pembayaran, kirim pesan
                  konfirmasi dan bukti pembayaran untuk
                  pemeriksaan Admin Singgahna.
                </p>

                <div className="rounded-2xl bg-[#F5F2E9] p-4 space-y-2">
                  <p className="text-sm text-[#687568]">
                    Nomor WhatsApp Admin (Demo)
                  </p>

                  <p className="font-bold text-[#263A32]">
                    {PAYMENT_INFO.whatsapp}
                  </p>

                </div>

                <Button
                  variant="default"
                  className="w-full"
                  onClick={handleCopyMessage}
                >
                  Salin Pesan Konfirmasi
                </Button>

              </div>
            </>
          )}

          {/* Status Information */}
          {booking.status === "approved" && (
            <div className="rounded-2xl bg-[#E8EDDF] p-4">
              <h3 className="font-bold text-[#263A32]">
                Penyewaan Disetujui
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#526746]">
                Admin telah menyetujui penyewaan kamu.
                Terima kasih telah menggunakan Singgahna.
              </p>
            </div>
          )}

          {booking.status === "canceled" && (
            <div className="rounded-2xl bg-[#FCE8E6] p-4">
              <h3 className="font-bold text-[#B42318]">
                Pengajuan Dibatalkan
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#B42318]">
                Pengajuan penyewaan ini telah dibatalkan.
                Silakan periksa informasi lebih lanjut dengan Admin.
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <Link
              href="/dashboard/my-rentals"
              className="flex-1"
            >
              <Button
                variant="default"
                className="w-full"
              >
                Penyewaan Saya
              </Button>
            </Link>

            <Link
              href="/"
              className="flex-1"
            >
              <Button
                variant="third"
                className="w-full !border !border-[#E6E9E0] !bg-[#F5F2E9] !text-[#263A32]"
              >
                Kembali ke Beranda
              </Button>
            </Link>

          </div>

        </div>
      </section>
    </main>
  );
}

export default BookingSuccess;