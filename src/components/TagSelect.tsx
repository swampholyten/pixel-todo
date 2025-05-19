import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Command,
  CommandList,
  CommandInput,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface Props {
  available: string[];
  value: string[];
  onChange: (tags: string[]) => void;
}

export default function TagSelect({ available, value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleTag = (tag: string) => {
    onChange(
      value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag],
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start min-h-[38px]">
          {value.length ? (
            <div className="flex flex-wrap gap-1">
              {value.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          ) : (
            "Tags"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-56">
        <Command>
          <CommandInput
            placeholder="Search tags…"
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>{" "}
            {available.map((tag) => (
              <CommandItem key={tag} onSelect={() => toggleTag(tag)}>
                <Check
                  className={
                    value.includes(tag) ? "opacity-100 mr-2" : "opacity-0 mr-2"
                  }
                  size={16}
                />
                {tag}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
