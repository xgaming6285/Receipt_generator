import React from "react";
import FloatingLabelInput from "./FloatingLabelInput";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users } from "lucide-react";

const BillToSection = ({
  billTo,
  handleInputChange,
  selectedCurrency,
  setSelectedCurrency,
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <DollarSign className="h-5 w-5" />
            Currency Selection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={selectedCurrency}
            onValueChange={setSelectedCurrency}
            className="grid grid-cols-3 gap-4"
          >
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="INR" id="inr" />
              <Label htmlFor="inr" className="font-medium cursor-pointer">
                INR (₹)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="USD" id="usd" />
              <Label htmlFor="usd" className="font-medium cursor-pointer">
                USD ($)
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <RadioGroupItem value="BGN" id="bgn" />
              <Label htmlFor="bgn" className="font-medium cursor-pointer">
                BGN (лв)
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FloatingLabelInput
              id="billToName"
              label="Customer Name"
              value={billTo.name}
              onChange={handleInputChange}
              name="name"
              required
            />
            <FloatingLabelInput
              id="billToPhone"
              label="Phone Number"
              value={billTo.phone}
              onChange={handleInputChange}
              name="phone"
              required
            />
          </div>
          <FloatingLabelInput
            id="billToAddress"
            label="Customer Address"
            value={billTo.address}
            onChange={handleInputChange}
            name="address"
            required
            helperText="Complete address for billing"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default BillToSection;
