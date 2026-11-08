"use client";

import { Button } from "@/components/atomics/button";
import { useToast } from "@/components/atomics/use-toast";
import CardBooking from "@/components/molecules/card/card-booking";
import { DatePickerDemo } from "@/components/molecules/date-picker";
import { moneyFormat } from "@/lib/utils";
import { useCheckAvailabilityMutation } from "@/services/transaction.service";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface BookingSectionProps {
  id: number;
  slug: string;
  price: number;
}

function BookingSection({ id, slug, price }: BookingSectionProps) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const { toast } = useToast();
  const router = useRouter();

  const [checkAvailability, { isLoading }] =
    useCheckAvailabilityMutation();

  // Perhitungan harga dan durasi penyewaan
  const booking = useMemo(() => {
    let totalDays = 0;
    let subTotal = 0;
    let fee = 0;
    let grandTotal = 0;

    if (startDate && endDate) {
      const difference = moment(endDate)
        .startOf("day")
        .diff(moment(startDate).startOf("day"), "days");

      if (difference >= 0) {
        // Durasi dihitung secara inklusif
        totalDays = difference + 1;

        subTotal = totalDays * price;
        fee = Math.round(subTotal * 0.1);
        grandTotal = subTotal + fee;
      }
    }

    return { totalDays, subTotal, fee, grandTotal };
  }, [startDate, endDate, price]);

  // Mengajukan penyewaan
  const handleBook = async () => {
    if (!startDate || !endDate) {
      toast({
        title: "Tanggal belum lengkap",
        description: "Silakan pilih tanggal mulai dan tanggal selesai.",
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
      const data = {
        listing_id: id,
        start_date: moment(startDate).format("YYYY-MM-DD"),
        end_date: moment(endDate).format("YYYY-MM-DD"),
      };

      // Periksa ketersediaan kos terlebih dahulu
      const res = await checkAvailability(data).unwrap();

      if (res.success) {
        router.push(
          `/listing/${slug}/checkout?start_date=${data.start_date}&end_date=${data.end_date}`
        );
      }
    } catch (error: any) {
      if (error.status === 401) {
        toast({
          title: "Silakan login",
          description: "Kamu harus login terlebih dahulu untuk mengajukan penyewaan.",
          variant: "destructive",
        });
      } else if (error.status === 409) {
        toast({
          title: "Tanggal tidak tersedia",
          description: "Kos sudah dibooking pada tanggal tersebut.",
          variant: "destructive",
        });
      } else if (error.status === 422) {
        toast({
          title: "Tanggal tidak valid",
          description: "Pastikan tanggal penyewaan bukan tanggal yang sudah lewat.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Terjadi kesalahan",
          description: "Pengajuan penyewaan gagal. Silakan coba kembali.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="w-full max-w-[360px] xl:max-w-[400px] h-fit space-y-5 bg-white border border-[#E6E9E0] rounded-[20px] p-[30px] shadow-[0_8px_24px_rgba(38,58,50,0.05)]">

      {/* Booking Heading */}
      <h1 className="font-bold text-lg leading-[27px] text-[#263A32]">
        Ajukan Penyewaan
      </h1>

      {/* Daily Price */}
      <div className="leading-6 text-[#263A32]">
        <span className="font-bold text-4xl leading-[54px]">
          {moneyFormat.format(price)}
        </span>
        <span className="ml-1 text-sm text-[#687568]">
          /hari
        </span>
      </div>

      {/* Date Selection */}
      <div className="space-y-5">
        <DatePickerDemo
          placeholder="Tanggal Mulai"
          date={startDate}
          setDate={setStartDate}
          listingId={id}
        />

        <DatePickerDemo
          placeholder="Tanggal Selesai"
          date={endDate}
          setDate={setEndDate}
          listingId={id}
          startDate={startDate}
        />
      </div>

      {/* Booking Price Details */}
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

        <CardBooking
          title="Total Pembayaran"
          value={moneyFormat.format(booking.grandTotal)}
        />
      </div>

      {/* Submit Booking */}
      <Button
        variant="default"
        className="mt-4"
        onClick={handleBook}
        disabled={isLoading || !startDate || !endDate || booking.totalDays <= 0}
      >
        {isLoading ? "Memeriksa Ketersediaan..." : "Lanjut ke Konfirmasi"}
      </Button>
    </div>
  );
}

export default BookingSection;
