"use client";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Kalam } from "next/font/google";
import { useState } from "react";
import Link from "next/link";
const k = Kalam({
  weight: "400",
  subsets: ["latin"],
});

const emp = [
  {
    id: "49",
    name: "yyeeffffffffffffffffffffffffffffffffffffffffff",
    img: "https://picsum.photos/200",
  },
  {
    id: "4i",
    name: "yyeeffffffffffffffffffffffffffffffffffffffffff",
    img: "https://picsum.photos/200",
  },
  {
    id: "4fa",
    name: "yyeeffffffffffffffffffffffffffffffffffffffffff",
    img: "https://picsum.photos/200",
  },
  {
    id: "41",
    name: "yyeeffffffffffffffffffffffffffffffffffffffffff",
    img: "https://picsum.photos/200",
  },
  {
    id: "4",
    name: "yyeeffffffffffffffffffffffffffffffffffffffffff",
    img: "https://picsum.photos/200",
  },
  {
    id: "3",
    name: "yyee",
    img: "https://picsum.photos/200",
  },
  {
    id: "1",
    name: "yyee",
    img: "https://picsum.photos/200",
  },
  {
    id: "2",
    name: "yyee",
    img: "https://picsum.photos/200",
  },
  {
    id: "8",
    name: "yyee",
    img: "https://picsum.photos/200",
  },
];

export default function Pay({ params }: { params: { id: string } }) {
  const [text, setText] = useState("");
  const [selected, setSelected] = useState<string>("");

  return (
    <div>
      <h1 className={cn(`${k.className}`, " text-white font-bold text-3xl")}>
        tipsyzzz
      </h1>

      <div className=" text-black bg-gradient-to-r from-teal-400 to-yellow-200 p-2 rounded-md text-center mt-4">
        Hotel {params.id}
      </div>
      <div className="text-white font-semibold pt-4 mb-1 text-xl">
        Select Waiter
      </div>
      <input
        type="text"
        id="search"
        placeholder="&#x1F50D; Search by name"
        className="p-2 mb-3 rounded-md w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="text-green-400 grid grid-cols-3 gap-2">
        {emp.map(({ id, name, img }) => {
          return (
            <div
              key={id}
              className={cn(
                "p-2",
                selected.includes(id)
                  ? "border-2 border-green-400 rounded-md"
                  : ""
              )}
              onClick={() => {
                if (selected[0] === id) {
                  setSelected("");
                } else {
                  setSelected(id);
                }
              }}
            >
              <img src={img} alt="" width={100} height={100} />
              <div className="truncate">{name}</div>
            </div>
          );
        })}
      </div>

      {selected && (
        <Button
          variant="outline"
          size="icon"
          className="fixed w-4/5 bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-6 py-3"
          asChild
          color="green"
        >
          <Link href={`/pay/${params.id}/${selected}`}>
            <ChevronRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}
