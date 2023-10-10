import Image from "next/image";
import { Heading } from "../components/Heading";
import logoGo from "../images/logos/go.svg";
import logoNode from "../images/logos/node.svg";
import logoPhp from "../images/logos/php.svg";
import logoPython from "../images/logos/python.svg";
import logoRuby from "../images/logos/ruby.svg";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";

const libraries = [
  {
    href: "#",
    name: "PHP",
    description:
      "A popular general-purpose scripting language that is especially suited to web development.",
    logo: logoPhp,
  },
  {
    href: "#",
    name: "Ruby",
    description:
      "A dynamic, open source programming language with a focus on simplicity and productivity.",
    logo: logoRuby,
  },
  {
    href: "#",
    name: "Node.js",
    description:
      "Node.js® is an open-source, cross-platform JavaScript runtime environment.",
    logo: logoNode,
  },
  {
    href: "#",
    name: "Python",
    description:
      "Python is a programming language that lets you work quickly and integrate systems more effectively.",
    logo: logoPython,
  },
  {
    href: "#",
    name: "Go",
    description:
      "An open-source programming language supported by Google with built-in concurrency.",
    logo: logoGo,
  },
];

export function Libraries() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="official-libraries">
        Official libraries
      </Heading>
      <div className="not-prose border-secondary-900/5 mt-4 grid grid-cols-1 gap-x-6 gap-y-10 border-t pt-10 dark:border-white/5 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3">
        {libraries.map((library) => (
          <div key={library.name} className="flex flex-row-reverse gap-6">
            <div className="flex-auto">
              <h3 className="text-secondary-900 text-sm font-semibold dark:text-white">
                {library.name}
              </h3>
              <p className="text-secondary-600 dark:text-secondary-400 mt-1 text-sm">
                {library.description}
              </p>

              <Link
                href={library.href}
                className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 mt-4 flex w-max items-center gap-1.5 font-semibold transition-all"
              >
                <p>Read more</p>
                <HiArrowRight />
              </Link>
            </div>
            <Image
              src={library.logo}
              alt=""
              className="h-12 w-12"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
