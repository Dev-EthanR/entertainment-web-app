"use client";
import Image from "next/image";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import clsx from "clsx";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  style?: string;
  placeholder: string;
  searchParams: string;
}

const Search = ({ style, placeholder, searchParams }: Props) => {
  const [inputValue, setInputValue] = useState(searchParams);
  const value = useDebounce(inputValue);
  const pathname = usePathname();

  const router = useRouter();
  useEffect(() => {
    if (!!!value.debounceValue) return router.replace(pathname);
    router.push(`?search=${value.debounceValue}`);
  }, [value.debounceValue]);
  return (
    <InputGroup
      className={clsx("border-none caret-accent-500 text-white", style)}
    >
      <InputGroupInput
        placeholder={placeholder}
        className="ml-4"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <InputGroupAddon>
        <Image src="/icon-search.svg" alt="" width={32} height={32} />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default Search;
