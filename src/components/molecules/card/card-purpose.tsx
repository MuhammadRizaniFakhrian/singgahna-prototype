
import Image from 'next/image'

function CardPurpose({
  image,
  title,
  purpose
}: {
  image: string
  title: string
  purpose: string
}) {
  return (
    <figure className="group relative overflow-hidden rounded-3xl border border-[#E6E9E0] bg-[#E8EDDF] shadow-[0_8px_20px_rgba(38,58,50,0.06)]">

      <Image
        src={image}
        alt={title}
        width={620}
        height={400}
        quality={90}
        sizes="(min-width: 1280px) 310px, 280px"
        className="block h-[200px] w-[280px] xl:w-[310px] rounded-3xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />

      <div className="absolute flex flex-col p-5 top-0 rounded-3xl w-[280px] xl:w-[310px] h-[200px] text-white bg-gradient-to-t from-[#263A32]/95 via-[#263A32]/20 to-transparent to-[35%]">

        <div className="mt-auto flex items-center justify-between">
          <span className="font-bold text-xl leading-[30px] max-w-[163px] drop-shadow-sm">
            {title}
          </span>

          <div className="flex items-center text-sm leading-[21px]">
            <Image
              src="/icons/profile-2user.svg"
              alt="profile-icon"
              height={0}
              width={0}
              className="w-[18px] h-[18px] mr-[1.5px]"
            />
            {purpose}
          </div>
        </div>
      </div>
    </figure>
  )
}

export default CardPurpose
