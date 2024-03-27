import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Success<T> = {
  isSuccess: true;
  value: T;
};

type Failure = {
  isSuccess: false;
  error: string;
};

export type Result<T> = Success<T> | Failure;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
