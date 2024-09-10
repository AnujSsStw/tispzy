"use client";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signIn } = useAuthActions();
  const [step, setStep] = useState<"signIn" | { phone: string }>("signIn");
  const { toast } = useToast();
  const router = useRouter();

  async function handle_oauth() {
    setIsLoading(true);
    try {
      await signIn("github", { redirectTo: "/dashboard" });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(event.currentTarget as HTMLFormElement);
      console.log(formData.get("phone"));
      const res = await signIn("twilio", formData);
      if (res) {
        setStep({ phone: formData.get("phone") as string });
        toast({
          title: "Code sent",
          variant: "default",
        });
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Could not send code",
        variant: "destructive",
      });
    }
  }

  if (step !== "signIn") {
    return (
      <>
        <form
          className="flex flex-col "
          onSubmit={async (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            try {
              await signIn("twilio", formData).catch(() => {});
              toast({
                title: "Logged in",
                variant: "default",
              });
              router.push("/worker");
            } catch (error) {
              console.error(error);
              toast({
                title: "Code could not be verified, try again",
                variant: "destructive",
              });
            }
          }}
        >
          <Label className="sr-only" htmlFor="code">
            Code
          </Label>
          <CodeInput length={6} />
          <input name="phone" value={step.phone} type="hidden" />
          <Button type="submit">Continue</Button>
          <Button
            type="button"
            variant="link"
            onClick={() => setStep("signIn")}
          >
            Cancel
          </Button>
        </form>
      </>
    );
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="phone">Phone number</Label>
            <Input
              name="phone"
              id="phone"
              placeholder="+91 9057xxxxxxx"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Send OTP
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handle_oauth}
      >
        {isLoading ? (
          <Spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}

const Spinner = (props: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};

function CodeInput({ length = 8 }: { length?: number }) {
  return (
    <div className="mb-4 mx-auto">
      <InputOTP maxLength={8} name="code" id="code">
        <InputOTPGroup>
          {Array(length)
            .fill(null)
            .map((_, index) => (
              <InputOTPSlot key={index} index={index} />
            ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
