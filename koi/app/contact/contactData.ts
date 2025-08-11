import { CardDetails } from "@/lib/types";
import contactsJson from "@/data/data.json";
import { contactImages, iconImages } from "@/utils";

const iconMap: Record<string, string> = {
  github: contactImages.github,
  discord: contactImages.discord,
  gmail: contactImages.email,
  instagram: contactImages.instagram,
};

const contactData: CardDetails[] = contactsJson.contacts.map((contact) => {
  const name = contact.name.toLowerCase();
  
  return {
    name: contact.name,
    url: contact.link,
    icon: iconMap[name] || iconImages.cat1,
    iconAlt: `${contact.name} icon`,
    isSensitive: true,
  };
});

export default contactData;
