
import Image from 'next/image'
import CardStar from '@/components/molecules/card/card-star'
import Title from '@/components/atomics/title'

function CardReview({
  rating,
  review,
  avatar,
  username,
  jobdesk
}: {
  rating: number
  review: string
  avatar: string
  username: string
  jobdesk: string
}) {
  return (
    <figure className="rounded-[20px] border border-[#E6E9E0] bg-white px-5 py-4 space-y-5 shadow-[0_8px_24px_rgba(38,58,50,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(38,58,50,0.10)]">

      {/* Rating */}
      <CardStar rating={rating} variant="review" />

      {/* Review Text */}
      <span className="block text-[#526056] text-lg leading-8">
        {review}
      </span>

      {/* Reviewer Profile */}
      <div className="flex items-center space-x-3">
        <Image
          src={avatar}
          alt={`Foto profil ${username}`}
          width={50}
          height={50}
          className="h-[50px] w-[50px] rounded-full object-cover ring-2 ring-[#E8EDDF]"
        />

        <Title
          title={username}
          subtitle={jobdesk}
          section="header"
        />
      </div>

    </figure>
  )
}

export default CardReview
