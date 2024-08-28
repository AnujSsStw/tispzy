"use client";
import { Button } from "@/components/ui/button";
import { log } from "console";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation"; // Usage: App router
import { useCallback, useEffect, useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

export default function Pay({ params }: { params: { waiterId: string } }) {
  const router = useRouter();
  const [currency, setCurrency] = useState<string>("₹");
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast, dismiss } = useToast();

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

  const getInputWidth = useCallback(() => {
    const baseWidth = 80; // Base width in pixels
    const widthPerDigit = 20; // Additional width per digit in pixels
    const digitCount = value.length > 0 ? value.length : 1; // Minimum 1 digit
    return baseWidth + widthPerDigit * (digitCount - 1);
  }, [value]);

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
            if (numericValue.length > 3) {
              toast({
                title: "Limit reached",
                description: `The maximum tip amount is ${currency}999.`,
              });
              return;
            } // Limit to 6 digits
            setValue(numericValue);
          }}
          style={{ width: `${getInputWidth()}px` }}
        />
      </div>
      {parseInt(value) > 5 && (
        <Button
          variant="outline"
          size="icon"
          className="fixed w-4/5 bottom-0 left-1/2 transform -translate-x-1/2 mb-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
          asChild
          color="green"
        >
          <Link href={`not sure`}>Pay</Link>
        </Button>
      )}
    </div>
  );
}
