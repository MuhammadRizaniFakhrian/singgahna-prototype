
"use client";

import Breadcrumbs from "@/components/molecules/breadcrumbs";
import CardBooking from "@/components/molecules/card/card-booking";
import { Button } from "@/components/atomics/button";
import { Separator } from "@/components/atomics/separator";
import Listing from "./listing";
import Review from "./review";

import { useGetDetailListingQuery } from "@/services/listing.service";
import {
  useTransactionMutation,
} from "@/services/transaction.service";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import moment from "moment";
import { moneyFormat } from "@/lib/utils";
import { DatePickerDemo } from "@/components/molecules/date-picker";
import { useToast } from "@/components/atomics/use-toast";
import { PAYMENT_INFO } from "@/lib/payment-info";

function CheckoutContent() {
  const params = useParams<{ id: string }>();
  const { data: response, isLoading: isListingLoading } =
    useGetDetailListingQuery(params.id);

  const listing = response?.data;

  const [createTransaction, { isLoading }] =
    useTransactionMutation();

  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  const parseDate = (value: string | null) => {
    if (!value || !moment(value, "YYYY-MM-DD", true).isValid()) {
      return undefined;
    }

    return moment(value, "YYYY-MM-DD").toDate();
  };

  const [startDate, setStartDate] = useState<Date | undefined>(
    () => parseDate(searchParams.get("start_date"))
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    () => parseDate(searchParams.get("end_date"))
  );

  // Booking price calculation
  const booking = useMemo(() => {
    let totalDays = 0;
    let subTotal = 0;
    let fee = 0;
    let grandTotal = 0;

    if (startDate && endDate && listing) {
      const difference = moment(endDate)
        .startOf("day")
        .diff(moment(startDate).startOf("day"), "days");

      if (difference >= 0) {
        // Durasi dihitung secara inklusif
        totalDays = difference + 1;

        subTotal = totalDays * Number(listing.price_per_day);
        fee = Math.round(subTotal * 0.1);
        grandTotal = subTotal + fee;
      }
    }

    return {
      totalDays,
      subTotal,
      fee,
      grandTotal,
    };
  }, [startDate, endDate, listing]);

  // Submit booking request
  const handleBooking = async () => {
    if (!listing || !startDate || !endDate) {
      toast({
        title: "Data belum lengkap",
        description: "Silakan periksa tanggal penyewaan kamu.",
        variant: "destructive",
      });

      return;
    }

    if (moment(endDate).isBefore(startDate, "day")) {
      toast({
        title: "Tanggal tidak valid",
        description: "Tanggal selesai tidak boleh sebelum tanggal mulai.",
        variant: "destructive",
      });

      return;
    }

    try {
      const payload = {
        listing_id: listing.id,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      };

      // Backend akan memeriksa bentrok tanggal
      // dan membuat transaksi dengan status waiting.
      const res = await createTransaction(payload).unwrap();

      if (res.success && res.data?.id) {
        toast({
          title: "Booking berhasil diajukan!",
          description: "Silakan tunggu persetujuan admin.",
        });

        router.push(
          `/booking-success/${res.data.id}/success`
        );
      }
    } catch (error: any) {
      const status = error?.status;
      const message =
        error?.data?.message || "Silakan coba kembali.";

      if (status === 401) {
        toast({
          title: "Silakan login",
          description: "Login diperlukan untuk mengajukan penyewaan.",
          variant: "destructive",
        });
      } else if (status === 409) {
        toast({
          title: "Tanggal tidak tersedia",
          description: "Kos sudah dibooking pada tanggal tersebut.",
          variant: "destructive",
        });
      } else if (status === 422) {
        toast({
          title: "Tanggal tidak valid",
          description: message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Booking gagal",
          description: message,
          variant: "destructive",
        });
      }
    }
  };

  if (isListingLoading) {
    return (
      <main className="min-h-screen grid place-items-center bg-gray-light">
        <p className="text-secondary">
          Memuat informasi penyewaan...
        </p>
      </main>
    );
  }

  if (!listing) {
    return (
      <main className="min-h-screen grid place-items-center bg-gray-light">
        <p className="text-secondary">
          Data kos tidak ditemukan.
        </p>
      </main>
    );
  }

  return (
    <main>
      {/* Breadcrumb */}
      <section
        id="breadcrumb-section"
        className="bg-gray-light pt-[170px] pb-[178px]"
      >
        <div className="container mx-auto">
          <Breadcrumbs />
        </div>
      </section>

      {/* Booking Information */}
      <section
        id="booking-information-section"
        className="container mx-auto flex flex-col lg:flex-row gap-10 lg:gap-[50px] -mt-[148px]"
      >
        <Listing listing={listing} />

        <div className="w-full max-w-[460px]">

          {/* Rental Summary */}
          <div>
            <h1 className="text-center font-bold text-[22px] leading-[33px] text-[#263A32]">
              Konfirmasi Penyewaan
            </h1>

            <div className="rounded-[30px] mt-5 p-[30px] bg-white border border-border shadow-indicator space-y-5">

              <div className="space-y-5">
                <DatePickerDemo
                  placeholder="Tanggal Mulai"
                  date={startDate}
                  setDate={setStartDate}
                  listingId={listing.id}
                />

                <DatePickerDemo
                  placeholder="Tanggal Selesai"
                  date={endDate}
                  setDate={setEndDate}
                  listingId={listing.id}
                  startDate={startDate}
                />
              </div>

              <Separator className="bg-border" />

              <div className="space-y-5">
                <CardBooking
                  title="Durasi Penyewaan"
                  value={`${booking.totalDays} hari`}
                />

                <CardBooking
                  title="Subtotal"
                  value={moneyFormat.format(booking.subTotal)}
                />

                <CardBooking
                  title="Biaya Layanan (10%)"
                  value={moneyFormat.format(booking.fee)}
                />

                <Separator className="bg-border" />

                <CardBooking
                  title="Total Pembayaran"
                  value={moneyFormat.format(booking.grandTotal)}
                />
              </div>
            </div>
          </div>

          
          {/* Payment Information */}
          <div className="mt-[10px]">

            <div className="rounded-[30px] mt-2.5 p-[30px] bg-white border border-border shadow-indicator space-y-5">

              {/* Demo Account */}
              <div className="rounded-2xl bg-white border border-[#E6E9E0] p-4 pb-6 space-y-3">

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

              {/* Submit Booking */}
              <Button
                variant="default"
                size="default"
                className="mt-4"
                onClick={handleBooking}
                disabled={
                  isLoading ||
                  !startDate ||
                  !endDate ||
                  booking.totalDays <= 0
                }
              >
                {isLoading
                  ? "Mengirim Pengajuan..."
                  : "Ajukan Penyewaan"}
              </Button>

            </div>
          </div>

        </div>
      </section>

      <Review />
    </main>
  );
}

export default function Checkout() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <CheckoutContent />
    </Suspense>
  );
}
