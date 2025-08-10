import { TLink } from '@/lib/types';
import { cn } from '@/utils';

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