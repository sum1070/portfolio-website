import { cn, myImages } from "@/utils";
import contactsJson from "@/data/data.json";

interface AboutAvatarProps {
  className?: string; // override the wrapper size (wrapper owns the avatar size)
}

// Avatar with online status dot, links to GitHub
const AboutAvatar = ({ className }: AboutAvatarProps) => {
  const githubContact = contactsJson.contacts.find(
    (contact) => contact.name === "GitHub",
  );
  const githubUrl = githubContact?.link || "https://github.com";

  return (
    <a
      id="about-avatar"
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="My Github"
      className={cn(
        // block + explicit size so the dot anchors to the same box as the image
        "relative block shrink-0 group",
        className || "w-22 h-22 md:w-28 md:h-28",
      )}
    >
      <img
        src={myImages.avatar}
        alt="Avatar"
        className={cn(
          "w-full h-full rounded-full object-cover",
          "border-2 border-bright-pink group-hover:border-purple2 transition-colors duration-300",
        )}
      />
      {/* Online status dot (sized relative to the avatar so it scales with it) */}
      <span
        id="online-status"
        title="Online"
        className={cn(
          "absolute bottom-0 right-0 w-[22%] h-[22%] rounded-full bg-green-500",
          "border-2 md:border-4 border-milky-white dark:border-dark-black",
        )}
      />
    </a>
  );
};

export default AboutAvatar;
