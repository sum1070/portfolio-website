import { cn } from '@/lib/utils'
import { TLink } from '@/lib/types';

const KoiUrl = ({
    href = "",
    children,
    className = ""
}: Readonly<TLink>) => {

    return (
        <a className={cn("koi-url", className)} href={href}>
            {children}
        </a>
    )
}

export default KoiUrl