import { ErrorIcon } from "./Icons";

export default function Error({ message }: { message: string }) {
  return (
    <div className="fixed bottom-10 left-0 z-50 grid w-screen justify-center">
      <div className="flex items-center gap-4 rounded-2xl border-2 border-red-600 bg-red-200 px-4 py-3">
        <ErrorIcon styles="h-8 w-8 rounded-full shadow-md" />
        <div className="text-sm">
          <div className="font-semibold">Something went wrong!</div>
          <div>{message}</div>
        </div>
      </div>
    </div>
  );
}
