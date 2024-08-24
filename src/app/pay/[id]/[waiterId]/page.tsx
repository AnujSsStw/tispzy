"use client";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation"; // Usage: App router
import { useEffect, useRef, useState } from "react";

export default function Pay({ params }: { params: { waiterId: string } }) {
  const router = useRouter();
  const [currency, setCurrency] = useState<string>("₹");
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when the component mounts
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    const getCurr = async () => {
      const curr = await fetch("https://ipapi.co/json");

      const data = await curr.json();
      console.log(data.currency);
      switch (data.currency) {
        case "INR":
          setCurrency("₹");
          break;
        case "USD":
          setCurrency("$");
          break;
        case "EUR":
          setCurrency("€");
          break;
        case "GBP":
          setCurrency("£");
          break;
        default:
          setCurrency("₹");
          break;
      }
    };
    getCurr();
  }, []);

  const getInputWidth = () => {
    const baseWidth = 80; // Base width in pixels
    const widthPerDigit = 20; // Additional width per digit in pixels
    const digitCount = value.length > 0 ? value.length : 1; // Minimum 1 digit
    return baseWidth + widthPerDigit * (digitCount - 1);
  };

  return (
    <div>
      <Button variant="outline" size="icon" onClick={() => router.back()}>
        <ChevronLeftIcon className="h-4 w-4" />
      </Button>

      <div className="text-white text-center font-semibold pt-4 mb-1 text-xl">
        Tipping {params.waiterId} zfkajfl
      </div>

      <div className="flex justify-center mt-4">
        <div className="text-5xl">{currency}</div>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`text-5xl bg-transparent border-white text-white text-center focus:outline-none`}
          placeholder="0"
          value={value}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, "");
            setValue(numericValue);
          }}
          style={{ width: `${getInputWidth()}px` }}
        />
      </div>
      <div className="text-green-400 grid grid-cols-3 gap-2"></div>
    </div>
  );
}
