import React, { useState } from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { ChevronDown, ChevronUp, Truck, Copy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const ShipToSection = ({ shipTo, handleInputChange, billTo }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copyBillToShip, setCopyBillToShip] = useState(false);

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleCopyBillToShip = (checked) => {
    setCopyBillToShip(checked);
    if (checked) {
      handleInputChange({ target: { name: "name", value: billTo.name } });
      handleInputChange({ target: { name: "address", value: billTo.address } });
      handleInputChange({ target: { name: "phone", value: billTo.phone } });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Truck className="h-5 w-5" />
            Shipping Information
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="copyBillToShip"
                checked={copyBillToShip}
                onCheckedChange={handleCopyBillToShip}
              />
              <Label
                htmlFor="copyBillToShip"
                className="text-sm font-medium cursor-pointer"
              >
                Same as Customer
              </Label>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleExpand}
              className="p-2"
            >
              {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </Button>
          </div>
        </div>
      </CardHeader>
      {isExpanded && (
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="shipToName"
              label="Recipient Name"
              value={shipTo.name}
              onChange={handleInputChange}
              name="name"
              required
            />
            <FloatingLabelInput
              id="shipToPhone"
              label="Phone Number"
              value={shipTo.phone}
              onChange={handleInputChange}
              name="phone"
              required
            />
          </div>
          <FloatingLabelInput
            id="shipToAddress"
            label="Shipping Address"
            value={shipTo.address}
            onChange={handleInputChange}
            name="address"
            required
            helperText="Complete address for delivery"
          />
        </CardContent>
      )}
    </Card>
  );
};

export default ShipToSection;
