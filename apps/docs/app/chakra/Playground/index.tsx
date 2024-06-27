"use client";
import { Flex, Link, Spacer, Text } from "@chakra-ui/react";
import { workflowBlocks, workflowConfig } from "@fibr/blocks";
import { Workspace } from "@fibr/builder";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NextLink from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Logo } from "../../../components/Logo";
import { ChakraLogo } from "../ChakraLogo";
import { Builder } from "./Builder";

export default function Playground() {
  return (
    <Workspace>
      <Header />
      <Builder blocks={workflowBlocks} config={workflowConfig} />
      <Footer />
    </Workspace>
  );
}

function Header() {
  return (
    <Link
      title="Fibr Logo"
      _hover={{ textDecoration: "none" }}
      href="https://www.rhinobase.io/"
    >
      <Flex
        gap={2}
        align="center"
        px={2}
        py={0.5}
        w="100%"
        borderBottomWidth="1px"
        borderColor="gray.200"
      >
        <Flex align="baseline" gap={0.5} userSelect="none">
          <Logo style={{ height: 16, width: "auto" }} />
          <Text fontSize="xl" fontWeight={700} fontStyle="italic">
            Fibr
          </Text>
        </Flex>
        <XMarkIcon height={14} width={14} strokeWidth={3} opacity={0.7} />
        <Flex align="center" gap={0.5} userSelect="none">
          <ChakraLogo style={{ height: 20, width: "auto" }} />
          <Text fontSize="xl" fontWeight={700}>
            chakra
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}

const SOCIALS = {
  twitter: {
    link: "https://twitter.com/rhinobaseio",
    icon: FaXTwitter,
  },
  github: {
    link: "https://github.com/rhinobase/fibr",
    icon: FaGithub,
  },
};

function Footer() {
  return (
    <Flex
      align="center"
      w="100%"
      userSelect="none"
      borderTopWidth="1px"
      fontSize="0.75rem"
      lineHeight="1.25rem"
      borderColor="gray.200"
    >
      <Text opacity={0.6}>version {process.env.NEXT_PUBLIC_VERSION}</Text>
      <Spacer />
      <Text opacity={0.6}>
        © {new Date().getFullYear()} rhinobase, Inc. All rights reserved.
      </Text>
      <Spacer />
      <Flex align="center" gap={2} px={2}>
        {Object.entries(SOCIALS).map(([name, { link, icon: Icon }]) => (
          <NextLink href={link} passHref key={name}>
            <Link
              title={name}
              color="gray.500"
              _hover={{ color: "black" }}
              transition="all"
              transitionTimingFunction="ease-in-out"
              target="_blank"
              rel="noopener"
            >
              <Icon size={15} />
            </Link>
          </NextLink>
        ))}
      </Flex>
    </Flex>
  );
}
