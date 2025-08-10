import { CardDetails } from "@/lib/types";
import { iconImages } from "@/lib/utils";
import contactsJson from "@/data/data.json";

const contactData: CardDetails[] = contactsJson.contacts.map((contact) => {
    const mapContactsIcon = (name: string) => {
        switch (name.toLowerCase()) {
            case "github":
                return iconImages.github || iconImages.cat1;
            case "discord":
                return iconImages.discord || iconImages.cat1;
            case "gmail":
                return iconImages.email || iconImages.cat1;
            case "instagram":
                return iconImages.instagram || iconImages.cat1;
            default:
                return iconImages.cat1;
        }
    };

    return {
        name: contact.name,
        url: contact.link,
        icon: mapContactsIcon(contact.name),
        iconAlt: `${contact.name} icon`,
        isSensitive: true,
    };
});

export default contactData;