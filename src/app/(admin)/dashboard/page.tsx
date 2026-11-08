"use client";

import CardOverview from "@/components/molecules/card/card-overview";
import Title from "@/components/atomics/title";
import { useGetTransactionSummaryQuery } from "@/services/transaction.service";

const currencyFormat = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

function Dashboard() {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetTransactionSummaryQuery();

  const summary = response?.data;

  const statistics = [
    {
      image: "/icons/buildings.svg",
      title: String(summary?.total_rentals ?? 0),
      subtitle: "Total Penyewaan",
    },
    {
      image: "/icons/card.svg",
      title: String(summary?.waiting ?? 0),
      subtitle: "Menunggu Persetujuan",
    },
    {
      image: "/icons/building.svg",
      title: String(summary?.approved ?? 0),
      subtitle: "Penyewaan Disetujui",
    },
    {
      image: "/icons/card.svg",
      title: currencyFormat.format(
        Number(summary?.total_payment ?? 0)
      ),
      subtitle: "Total Pembayaran",
    },
  ];

  return (
    <main>
      {/* Page Heading */}
      <div>
        <Title
          section="admin"
          title="Statistik Penyewaan"
          subtitle="Pantau aktivitas penyewaan kos kamu di Singgahna."
        />
      </div>

      {/* Statistics */}
      <div className="mt-[30px]">

        {isLoading && (
          <p className="mt-4 text-sm text-[#687568]">
            Memuat ringkasan aktivitas...
          </p>
        )}

        {isError && (
          <p className="mt-4 text-sm text-red-500">
            Gagal memuat statistik penyewaan.
            Silakan coba kembali.
          </p>
        )}

        {!isLoading && !isError && (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-[30px] mt-3.5">
            {statistics.map((item, index) => (
              <CardOverview
                key={index}
                image={item.image}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Dashboard;
