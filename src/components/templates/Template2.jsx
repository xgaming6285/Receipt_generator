import React from "react";
import BaseTemplate from "./BaseTemplate";
import { formatCurrency } from "../../utils/formatCurrency";

const Template2 = ({ data }) => {
  const {
    billTo,
    shipTo,
    invoice,
    yourCompany,
    items,
    taxPercentage,
    taxAmount,
    subTotal,
    grandTotal,
    notes,
    selectedCurrency,
  } = data;

  return (
    <BaseTemplate data={data}>
      <div className="bg-white p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4 border-b-2 pb-4">
          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-cyan-700 break-words">
              {yourCompany.name}
            </h1>
            <p className="text-sm sm:text-base break-words">
              {yourCompany.address}
            </p>
            <p className="text-sm sm:text-base break-words">
              {yourCompany.phone}
            </p>
          </div>
          <div className="lg:text-right space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-cyan-700">
              Tax invoice
            </h2>
            <p className="text-sm sm:text-base break-words">
              <span className="font-semibold">INVOICE NUMBER:</span>{" "}
              {invoice.number}
            </p>
            <p className="text-sm sm:text-base break-words">
              <span className="font-semibold">DATE:</span> {invoice.date}
            </p>
            <p className="text-sm sm:text-base break-words">
              <span className="font-semibold">DUE DATE:</span>{" "}
              {invoice.paymentDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 sm:mb-8">
          <div className="space-y-1">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-cyan-700">
              Bill To
            </h3>
            <p className="text-sm sm:text-base break-words">{billTo.name}</p>
            <p className="text-sm sm:text-base break-words">{billTo.address}</p>
            <p className="text-sm sm:text-base break-words">{billTo.phone}</p>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-cyan-700">
              Ship To
            </h3>
            <p className="text-sm sm:text-base break-words">{shipTo.name}</p>
            <p className="text-sm sm:text-base break-words">{shipTo.address}</p>
            <p className="text-sm sm:text-base break-words">{shipTo.phone}</p>
          </div>
        </div>

        <div className="mb-6 sm:mb-8 overflow-x-auto">
          <table className="w-full border border-gray-300 min-w-[500px]">
            <thead>
              <tr>
                <th className="p-2 text-left border border-gray-300 text-xs sm:text-sm">
                  ID
                </th>
                <th className="p-2 text-left border border-gray-300 text-xs sm:text-sm">
                  Description
                </th>
                <th className="p-2 text-right border border-gray-300 text-xs sm:text-sm">
                  Quantity
                </th>
                <th className="p-2 text-right border border-gray-300 text-xs sm:text-sm">
                  Rate
                </th>
                <th className="p-2 text-right border border-gray-300 text-xs sm:text-sm">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300 text-xs sm:text-sm">
                    {index + 1}
                  </td>
                  <td className="p-2 border border-gray-300">
                    <div className="text-xs sm:text-sm break-words">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 break-words">
                      {item.description}
                    </div>
                  </td>
                  <td className="p-2 text-right border border-gray-300 text-xs sm:text-sm">
                    {item.quantity}
                  </td>
                  <td className="p-2 text-right border border-gray-300 text-xs sm:text-sm">
                    {formatCurrency(item.amount, selectedCurrency)}
                  </td>
                  <td className="p-2 text-right border border-gray-300 text-xs sm:text-sm">
                    {formatCurrency(item.total, selectedCurrency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="w-full sm:w-2/3 md:w-1/3 space-y-2">
            <div className="flex justify-between text-sm sm:text-base">
              <span>Subtotal:</span>
              <span className="break-words">
                {formatCurrency(subTotal, selectedCurrency)}
              </span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between text-sm sm:text-base">
                <span>Tax ({taxPercentage}%):</span>
                <span className="break-words">
                  {formatCurrency(taxAmount, selectedCurrency)}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm sm:text-base">
              <span>Total:</span>
              <span className="break-words">
                {formatCurrency(grandTotal, selectedCurrency)}
              </span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-6 sm:mt-8 text-sm">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Notes:</h3>
            <p className="text-sm sm:text-base break-words">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template2;
