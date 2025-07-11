import React from "react";
import { format } from "date-fns";
import BaseTemplate from "./BaseTemplate";
import { formatCurrency } from "../../utils/formatCurrency";

const Template4 = ({ data }) => {
  const {
    billTo = {},
    shipTo = {},
    invoice = {},
    yourCompany = {},
    items = [],
    taxPercentage = 0,
    taxAmount = 0,
    subTotal = 0,
    grandTotal = 0,
    notes = "",
    selectedCurrency,
  } = data || {};

  return (
    <BaseTemplate data={data}>
      <div className="bg-white invoice-padding max-w-4xl mx-auto">
        <div className="invoice-grid-lg-2 invoice-section-spacing">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-purple-600 mb-4">
              Invoice
            </h1>
            <p className="text-responsive break-words">
              <span className="font-semibold">Invoice#:</span>{" "}
              {invoice.number || "N/A"}
            </p>
            <p className="text-responsive break-words">
              <span className="font-semibold">Invoice Date:</span>{" "}
              {invoice.date
                ? format(new Date(invoice.date), "MMM dd, yyyy")
                : "N/A"}
            </p>
            <p className="text-responsive break-words">
              <span className="font-semibold">Due Date:</span>{" "}
              {invoice.paymentDate
                ? format(new Date(invoice.paymentDate), "MMM dd, yyyy")
                : "N/A"}
            </p>
          </div>
          <div className="lg:text-right space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold break-words">
              {yourCompany.name || "Company Name"}
            </h2>
            <p className="text-responsive break-words">
              {yourCompany.address || "Company Address"}
            </p>
            <p className="text-responsive break-words">
              {yourCompany.phone || "Company Phone"}
            </p>
          </div>
        </div>

        <div className="invoice-grid-2 invoice-section-spacing">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-purple-600">
              Billed to
            </h3>
            <p className="text-responsive break-words">
              {billTo.name || "Client Name"}
            </p>
            <p className="text-responsive break-words">
              {billTo.address || "Client Address"}
            </p>
            <p className="text-responsive break-words">
              {billTo.phone || "Client Phone"}
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-semibold mb-2 text-purple-600">
              Shipped to
            </h3>
            <p className="text-responsive break-words">
              {shipTo.name || "Shipping Name"}
            </p>
            <p className="text-responsive break-words">
              {shipTo.address || "Shipping Address"}
            </p>
            <p className="text-responsive break-words">
              {shipTo.phone || "Shipping Phone"}
            </p>
          </div>
        </div>

        <div className="invoice-table-container invoice-section-spacing">
          <table className="invoice-table">
            <thead>
              <tr className="bg-purple-600 text-white">
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
                      {item.name || "Item Name"}
                    </div>
                    <div className="text-xs text-gray-500 break-words">
                      {item.description || "Item Description"}
                    </div>
                  </td>
                  <td className="p-2 text-center text-xs sm:text-sm">
                    {item.quantity || 0}
                  </td>
                  <td className="p-2 text-right text-xs sm:text-sm">
                    {formatCurrency(item.amount || 0, selectedCurrency)}
                  </td>
                  <td className="p-2 text-right text-xs sm:text-sm">
                    {formatCurrency(
                      (item.quantity || 0) * (item.amount || 0),
                      selectedCurrency
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <div className="invoice-totals">
            <div className="flex justify-between text-responsive">
              <span>Subtotal:</span>
              <span className="break-words">
                {formatCurrency(subTotal, selectedCurrency)}
              </span>
            </div>
            {taxPercentage > 0 && (
              <div className="flex justify-between text-responsive">
                <span>Tax ({taxPercentage}%):</span>
                <span className="break-words">
                  {formatCurrency(taxAmount, selectedCurrency)}
                </span>
              </div>
            )}
            <div className="flex justify-between font-bold text-responsive">
              <span>Total:</span>
              <span className="break-words">
                {formatCurrency(grandTotal, selectedCurrency)}
              </span>
            </div>
          </div>
        </div>

        {notes && (
          <div className="mt-6 sm:mt-8">
            <h3 className="font-semibold mb-2 text-responsive">Notes:</h3>
            <p className="text-responsive break-words">{notes}</p>
          </div>
        )}
      </div>
    </BaseTemplate>
  );
};

export default Template4;
