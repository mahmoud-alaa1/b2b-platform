import { LoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <LoaderCircle
      strokeWidth={2}
      className="animate-spin rounded-full  border-primary-500"
    />
  );
}
