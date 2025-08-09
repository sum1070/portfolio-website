import { iconImages } from '@/lib/utils'
import Image from 'next/image'

const NekoSleep = () => {
  return (
    <Image
      className="w-[32px] md:w-12 xl:w-16 inline-block ml-2 object-contain"
      alt="svg"
      src={iconImages.nekoSleep}
      width={48}
      height={48}
    />
  )
}

export default NekoSleep