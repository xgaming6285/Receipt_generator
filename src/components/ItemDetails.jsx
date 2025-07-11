import React from "react";
import { Trash2, Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FloatingLabelInput from "./FloatingLabelInput";
import { formatCurrency } from "../utils/formatCurrency";
import { cn } from "@/lib/utils";

const ItemDetails = ({
  items,
  handleItemChange,
  addItem,
  removeItem,
  currencyCode,
}) => {
  const currencySymbol =
    currencyCode === "USD" ? "$" : currencyCode === "BGN" ? "лв" : "₹";

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Item Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <Card
            key={index}
            className="relative group border-l-4 border-l-blue-500 transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <FloatingLabelInput
                  id={`itemName${index}`}
                  label="Item Name"
                  value={item.name}
                  onChange={(e) =>
                    handleItemChange(index, "name", e.target.value)
                  }
                  required
                  className="col-span-1"
                />
                <FloatingLabelInput
                  id={`itemQuantity${index}`}
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  required
                  min="0"
                  step="1"
                />
                <FloatingLabelInput
                  id={`itemAmount${index}`}
                  label={`Unit Price (${currencySymbol})`}
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "amount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  required
                  min="0"
                  step="0.01"
                />
                <div className="relative">
                  <FloatingLabelInput
                    id={`itemTotal${index}`}
                    label={`Total (${currencySymbol})`}
                    type="text"
                    value={formatCurrency(
                      item.quantity * item.amount,
                      currencyCode
                    )}
                    disabled
                    className="font-semibold"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>

              <FloatingLabelInput
                id={`itemDescription${index}`}
                label="Description (Optional)"
                value={item.description}
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
                helperText="Add additional details about this item"
              />

              {index > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  className={cn(
                    "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                    "h-8 w-8 p-0"
                  )}
                  onClick={() => removeItem(index)}
                  title="Remove this item"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-center pt-4">
          <Button
            onClick={addItem}
            variant="outline"
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
          >
            <Plus className="h-4 w-4" />
            Add New Item
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemDetails;
