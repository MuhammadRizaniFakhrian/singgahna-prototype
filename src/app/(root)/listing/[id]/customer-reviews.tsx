import CardReview from "@/components/molecules/card/card-review";
import React from "react";

function CustomerReviews() {
  return (
    <div>
      <h1 className="font-bold text-lg leading-[27px] text-secondary">
        Ulasan Penyewa 
      </h1>
      <div className="mt-2.5 grid grid-cols-2 gap-5">
        <CardReview
              rating={5}
              review="Fasilitas lengkap dan internet cepat. Tempatnya aman dan tenang untuk belajar."
              avatar="/images/avatar1.png"
              username="Yanto"
              jobdesk="Mahasiswa"
        />
        <CardReview
              rating={4}
              review="Pelayanan pemilik kos ramah, kamar cozy, dan harganya terjangkau. Sangat puas!"
              avatar="/images/avatar3.png"
              username="Yanti"
              jobdesk="Mahasiswa"
        />
      </div>
    </div>
  );
}

export default CustomerReviews;
