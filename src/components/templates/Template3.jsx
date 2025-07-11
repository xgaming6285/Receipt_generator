import React from "react";
import BaseTemplate from "./BaseTemplate";
import { formatCurrency } from "../../utils/formatCurrency";

const Template3 = ({ data }) => {
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
      <div className="bg-blue-500 text-white p-6 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 sm:mb-8">
          <div className="space-y-2">
            <div className="text-white inline-block">
              <h1
                className="text-xl sm:text-2xl font-bold break-words"
                id="company-name"
              >
                {yourCompany?.name || "Your Company Name"}
              </h1>
            </div>
            <p className="text-sm sm:text-base break-words">
              {yourCompany?.address || "Your Company Address"}
            </p>
            <p className="text-sm sm:text-base break-words">
              {yourCompany?.phone || "Your Company Phone"}
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">BILLED TO</h2>
            <p className="text-sm sm:text-base break-words">{billTo.name}</p>
            <p className="text-sm sm:text-base break-words">{billTo.address}</p>
            <p className="text-sm sm:text-base break-words">{billTo.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 sm:mb-8">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">SHIP TO</h2>
            <p className="text-sm sm:text-base break-words">{shipTo.name}</p>
            <p className="text-sm sm:text-base break-words">{shipTo.address}</p>
            <p className="text-sm sm:text-base break-words">{shipTo.phone}</p>
          </div>
          <div className="md:text-right space-y-1">
            <p className="text-sm sm:text-base break-words">
              <span className="font-semibold">Invoice #:</span> {invoice.number}
            </p>
            <p className="text-sm sm:text-base break-words">
              <span className="font-semibold">Invoice Date:</span>{" "}
              {invoice.date}
            </p>
            <p className="text-sm sm:text-base break-words">
              <span className="font-semibold">Due Date:</span>{" "}
              {invoice.paymentDate}
            </p>
            <p className="text-sm sm:text-base break-words">
              <span className="font-semibold">Due Amount:</span>{" "}
              {formatCurrency(grandTotal, selectedCurrency)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 lg:p-8">
        <div className="overflow-x-auto mb-6 sm:mb-8">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-2 text-left text-xs sm:text-sm">Item</th>
                <th className="p-2 text-center text-xs sm:text-sm">Quantity</th>
                <th className="p-2 text-right text-xs sm:text-sm">
                  Unit Price
                </th>
                <th className="p-2 text-right text-xs sm:text-sm">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="p-2">
                    <div className="text-xs sm:text-sm break-words">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500 break-words">
                      {item.description}
                    </div>
                  </td>
                  <td className="p-2 text-center text-xs sm:text-sm">
                    {item.quantity}
                  </td>
                  <td className="p-2 text-right text-xs sm:text-sm">
                    {formatCurrency(item.amount, selectedCurrency)}
                  </td>
                  <td className="p-2 text-right text-xs sm:text-sm">
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
          <div className="mt-6 sm:mt-8">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Notes:</h3>
            <p className="text-sm sm:text-base break-words">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template3;
