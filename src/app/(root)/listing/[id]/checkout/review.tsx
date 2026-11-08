import Title from "@/components/atomics/title";
import CardReview from "@/components/molecules/card/card-review";
import React from "react";

function Review() {
  return (
    <section id="review-section" className="container mx-auto my-[100px]">
      <div className="flex justify-center text-center">
        <Title
          title="Penyewa Puas"
          subtitle="Mereka nyaman dan betah tinggal di kos kami."
        />
      </div>
      <div className="mt-[30px] grid grid-cols-3 gap-[30px]">
          <div className="space-y-[30px]">
            <CardReview
              rating={4}
              review="Kosnya nyaman, bersih, dan dekat dengan kampus. Betah banget tinggal di sini!"
              avatar="/images/avatar1.png"
              username="Yono"
              jobdesk="Mahasiswa"
            />
          </div>
          <div className="space-y-[30px]">
            <CardReview
              rating={5}
              review="Fasilitas lengkap dan internet cepat. Tempatnya aman dan tenang untuk belajar."
              avatar="/images/avatar2.png"
              username="Yanto"
              jobdesk="Mahasiswa"
            />
          </div>
          <div className="space-y-[30px]">
            <CardReview
              rating={4}
              review="Pelayanan pemilik kos ramah, kamar cozy, dan harganya terjangkau. Sangat puas!"
              avatar="/images/avatar3.png"
              username="Yanti"
              jobdesk="Mahasiswa"
            />
          </div>
      </div>
    </section>
  );
}

export default Review;
