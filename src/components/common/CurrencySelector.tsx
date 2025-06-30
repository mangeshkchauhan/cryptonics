"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useCurrency } from "@/contexts/CurrencyContext";
import { cn } from "@/lib/utils";
import type { Currency } from "@/types/crypto";

const currencies = [
  { value: "usd" as Currency, label: "USD", symbol: "$" },
  { value: "eur" as Currency, label: "EUR", symbol: "€" },
  { value: "inr" as Currency, label: "INR", symbol: "₹" },
];

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  const selectedCurrency = currencies.find((c) => c.value === currency) || currencies[0];

  return (
    <div className="relative">
      <Listbox value={currency} onChange={setCurrency}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-gray-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 sm:text-sm min-w-[80px]">
            <span className="flex items-center">
              <span className="text-gray-300 font-medium">
                {selectedCurrency.symbol} {selectedCurrency.label}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronsUpDown
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-gray-700 focus:outline-none sm:text-sm">
              {currencies.map((curr) => (
                <Listbox.Option
                  key={curr.value}
                  className={({ active }) =>
                    cn(
                      active ? "bg-gray-700 text-white" : "text-gray-300",
                      "relative cursor-pointer select-none py-2 pl-6 pr-4"
                    )
                  }
                  value={curr.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={cn(
                          selected ? "font-medium" : "font-normal",
                          "block truncate"
                        )}
                      >
                        {curr.symbol} {curr.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-blue-400">
                          <Check className="h-4 w-4" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
} 