import { LogoIcon } from "@/components/logo";

export function SplashScreen() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-orange-400">
      <LogoIcon className="h-[10vw] w-[10vw] text-white" />
    </div>
  );
}
