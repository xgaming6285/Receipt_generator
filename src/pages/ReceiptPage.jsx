import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  RefreshCw,
  FileText,
  RotateCw,
  Building,
  Receipt,
  Package,
  Calculator,
  StickyNote,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Receipt1 from "../components/templates/Receipt1";
import Receipt2 from "../components/templates/Receipt2";
import Receipt3 from "../components/templates/Receipt3";
import Receipt4 from "../components/templates/Receipt4";
import { formatCurrency } from "../utils/formatCurrency";
import { generateReceiptPDF } from "../utils/receiptPDFGenerator";
import { generateGSTNumber } from "../utils/invoiceCalculations";
import FloatingLabelInput from "../components/FloatingLabelInput";
import ItemDetails from "../components/ItemDetails";

const generateRandomInvoiceNumber = () => {
  const length = Math.floor(Math.random() * 6) + 3;
  const alphabetCount = Math.min(Math.floor(Math.random() * 4), length);
  let result = "";
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  for (let i = 0; i < alphabetCount; i++) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  for (let i = alphabetCount; i < length; i++) {
    result += numbers[Math.floor(Math.random() * numbers.length)];
  }

  return result;
};
const footerOptions = [
  "Thank you for choosing us today! We hope your shopping experience was pleasant and seamless. Your satisfaction matters to us, and we look forward to serving you again soon. Keep this receipt for any returns or exchanges.",
  "Your purchase supports our community! We believe in giving back and working towards a better future. Thank you for being a part of our journey. We appreciate your trust and hope to see you again soon.",
  "We value your feedback! Help us improve by sharing your thoughts on the text message survey link. Your opinions help us serve you better and improve your shopping experience. Thank you for shopping with us!",
  "Did you know you can save more with our loyalty program? Ask about it on your next visit and earn points on every purchase. It’s our way of saying thank you for being a loyal customer. See you next time!",
  "Need assistance with your purchase? We’re here to help! Reach out to our customer support, or visit our website for more information. We’re committed to providing you with the best service possible.",
  "Keep this receipt for returns or exchanges.",
  "Every purchase makes a difference! We are dedicated to eco-friendly practices and sustainability. Thank you for supporting a greener planet with us. Together, we can build a better tomorrow.",
  "Have a great day!",
  "“Thank you for shopping with us today. Did you know you can return or exchange your items within 30 days with this receipt? We want to ensure that you’re happy with your purchase, so don’t hesitate to come back if you need assistance.",
  "Eco-friendly business. This receipt is recyclable.",
  "We hope you enjoyed your shopping experience! Remember, for every friend you refer, you can earn exclusive rewards. Visit www.example.com/refer for more details. We look forward to welcoming you back soon!",
  "Thank you for choosing us! We appreciate your business and look forward to serving you again. Keep this receipt for any future inquiries or returns.",
  "Your purchase supports local businesses and helps us continue our mission. Thank you for being a valued customer. We hope to see you again soon!",
  "We hope you had a great shopping experience today. If you have any feedback, please share it with us on our website. We are always here to assist you.",
  "Thank you for your visit! Remember, we offer exclusive discounts to returning customers. Check your email for special offers on your next purchase.",
  "Your satisfaction is our top priority. If you need any help or have questions about your purchase, don’t hesitate to contact us. Have a great day!",
  "We love our customers! Thank you for supporting our business. Follow us on social media for updates on promotions and new products. See you next time!",
  "Every purchase counts! We are committed to making a positive impact, and your support helps us achieve our goals. Thank you for shopping with us today!",
  "We hope you found everything you needed. If not, please let us know so we can improve your experience. Your feedback helps us serve you better. Thank you!",
  "Thank you for visiting! Did you know you can save more with our rewards program? Ask about it during your next visit and start earning points today!",
  "We appreciate your trust in us. If you ever need assistance with your order, please visit our website or call customer service. We’re here to help!",
];

const ReceiptPage = () => {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const receiptRef = useRef(null);

  const [billTo, setBillTo] = useState("");
  const [invoice, setInvoice] = useState({
    date: "",
    number: generateRandomInvoiceNumber(),
  });
  const [yourCompany, setYourCompany] = useState({
    name: "",
    address: "",
    phone: "",
    gst: "",
  });
  const [cashier, setCashier] = useState("");
  const [items, setItems] = useState([
    { name: "", description: "", quantity: 0, amount: 0, total: 0 },
  ]);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [theme, setTheme] = useState("Receipt1");
  const [notes, setNotes] = useState("");
  const [footer, setFooter] = useState("Thank you");
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [currentTab, setCurrentTab] = useState("company");

  const refreshFooter = () => {
    const randomIndex = Math.floor(Math.random() * footerOptions.length);
    setFooter(footerOptions[randomIndex]);
  };

  useEffect(() => {
    // Load form data from localStorage on component mount
    const savedFormData = localStorage.getItem("receiptFormData");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setBillTo(parsedData.billTo || "");
      setInvoice(
        parsedData.invoice || {
          date: "",
          number: generateRandomInvoiceNumber(),
        }
      );
      setYourCompany(
        parsedData.yourCompany || { name: "", address: "", phone: "", gst: "" }
      );
      setCashier(parsedData.cashier || "");
      setItems(
        parsedData.items || [
          { name: "", description: "", quantity: 0, amount: 0, total: 0 },
        ]
      );
      setTaxPercentage(parsedData.taxPercentage || 0);
      setNotes(parsedData.notes || "");
      setFooter(parsedData.footer || "Thank you");
      setSelectedCurrency(parsedData.selectedCurrency || "INR");
    } else {
      // Initialize with default values if nothing in localStorage
      setInvoice((prev) => ({
        ...prev,
        number: generateRandomInvoiceNumber(),
      }));
      setItems([
        { name: "", description: "", quantity: 0, amount: 0, total: 0 },
      ]);
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage whenever it changes
    const formData = {
      billTo,
      invoice,
      yourCompany,
      cashier,
      items,
      taxPercentage,
      notes,
      footer,
      selectedCurrency,
    };
    localStorage.setItem("receiptFormData", JSON.stringify(formData));
  }, [
    billTo,
    invoice,
    yourCompany,
    cashier,
    items,
    taxPercentage,
    notes,
    footer,
    selectedCurrency,
  ]);

  const handleDownloadPDF = async () => {
    if (!isDownloading && receiptRef.current) {
      setIsDownloading(true);
      const receiptData = {
        // Prepare receiptData object
        billTo,
        invoice,
        yourCompany,
        cashier,
        items,
        taxPercentage,
        notes,
        footer,
        selectedCurrency,
      };
      try {
        await generateReceiptPDF(receiptRef.current, theme, receiptData);
      } catch (error) {
        console.error("Error generating PDF:", error);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "quantity" || field === "amount") {
      newItems[index].total = newItems[index].quantity * newItems[index].amount;
    }
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", description: "", quantity: 0, amount: 0, total: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateSubTotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  const calculateTaxAmount = () => {
    const subTotal = parseFloat(calculateSubTotal());
    return (subTotal * (taxPercentage / 100)).toFixed(2);
  };

  const calculateGrandTotal = () => {
    const subTotal = parseFloat(calculateSubTotal());
    const taxAmount = parseFloat(calculateTaxAmount());
    return (subTotal + taxAmount).toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Receipt Generator</h1>
        <div className="flex items-center">
          <Button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="mr-4"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              "Download Receipt PDF"
            )}
          </Button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600"
            aria-label="Switch to Bill Generator"
          >
            <FileText size={24} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Receipt Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="company"
                value={currentTab}
                onValueChange={setCurrentTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger
                    value="company"
                    className="flex items-center gap-1"
                  >
                    <Building className="h-4 w-4" />
                    Company
                  </TabsTrigger>
                  <TabsTrigger
                    value="invoice"
                    className="flex items-center gap-1"
                  >
                    <Receipt className="h-4 w-4" />
                    Invoice
                  </TabsTrigger>
                  <TabsTrigger
                    value="items"
                    className="flex items-center gap-1"
                  >
                    <Package className="h-4 w-4" />
                    Items
                  </TabsTrigger>
                  <TabsTrigger
                    value="totals"
                    className="flex items-center gap-1"
                  >
                    <Calculator className="h-4 w-4" />
                    Totals
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="flex items-center gap-1"
                  >
                    <StickyNote className="h-4 w-4" />
                    Notes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="company" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Your Company Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingLabelInput
                          id="yourCompanyName"
                          label="Company Name"
                          value={yourCompany.name}
                          onChange={handleInputChange(setYourCompany)}
                          name="name"
                          required
                        />
                        <FloatingLabelInput
                          id="yourCompanyPhone"
                          label="Phone Number"
                          value={yourCompany.phone}
                          onChange={handleInputChange(setYourCompany)}
                          name="phone"
                          required
                        />
                      </div>
                      <FloatingLabelInput
                        id="yourCompanyAddress"
                        label="Business Address"
                        value={yourCompany.address}
                        onChange={handleInputChange(setYourCompany)}
                        name="address"
                        required
                      />
                      <div className="relative">
                        <FloatingLabelInput
                          id="yourCompanyGST"
                          label="GST Number"
                          value={yourCompany.gst}
                          onChange={(e) => {
                            const value = e.target.value.slice(0, 15);
                            handleInputChange(setYourCompany)({
                              target: { name: "gst", value },
                            });
                          }}
                          name="gst"
                          maxLength={15}
                          helperText="15-digit GST identification number"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            const newGST = generateGSTNumber();
                            setYourCompany((prev) => ({
                              ...prev,
                              gst: newGST,
                            }));
                          }}
                          variant="outline"
                          size="sm"
                          className="absolute right-2 top-2 h-8 w-8 p-0"
                          title="Generate new GST number"
                        >
                          <RotateCw size={14} />
                        </Button>
                      </div>
                      <FloatingLabelInput
                        id="cashier"
                        label="Cashier Name"
                        value={cashier}
                        onChange={(e) => setCashier(e.target.value)}
                        name="cashier"
                        helperText="Person handling the transaction"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="invoice" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Currency & Customer
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-3 block">
                          Select Currency
                        </Label>
                        <RadioGroup
                          value={selectedCurrency}
                          onValueChange={setSelectedCurrency}
                          className="grid grid-cols-3 gap-4"
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="INR" id="receipt-inr" />
                            <Label
                              htmlFor="receipt-inr"
                              className="font-medium"
                            >
                              INR (₹)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="USD" id="receipt-usd" />
                            <Label
                              htmlFor="receipt-usd"
                              className="font-medium"
                            >
                              USD ($)
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value="BGN" id="receipt-bgn" />
                            <Label
                              htmlFor="receipt-bgn"
                              className="font-medium"
                            >
                              BGN (лв)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <FloatingLabelInput
                        id="billTo"
                        label="Customer Name"
                        value={billTo}
                        onChange={(e) => setBillTo(e.target.value)}
                        name="billTo"
                        required
                        helperText="Name of the customer or business"
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FloatingLabelInput
                          id="invoiceNumber"
                          label="Invoice Number"
                          value={invoice.number}
                          onChange={handleInputChange(setInvoice)}
                          name="number"
                          required
                        />
                        <FloatingLabelInput
                          id="invoiceDate"
                          label="Invoice Date"
                          type="date"
                          value={invoice.date}
                          onChange={handleInputChange(setInvoice)}
                          name="date"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="items" className="mt-6">
                  <ItemDetails
                    items={items}
                    handleItemChange={handleItemChange}
                    addItem={addItem}
                    removeItem={removeItem}
                    currencyCode={selectedCurrency}
                  />
                </TabsContent>

                <TabsContent value="totals" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Calculation Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">Sub Total:</span>
                          <span className="font-semibold text-lg">
                            {formatCurrency(
                              parseFloat(calculateSubTotal()),
                              selectedCurrency
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 border rounded-lg">
                          <span className="font-medium">Tax Rate (%):</span>
                          <div className="flex items-center gap-2">
                            <FloatingLabelInput
                              id="taxPercentage"
                              label="Tax %"
                              type="number"
                              value={taxPercentage}
                              onChange={(e) =>
                                setTaxPercentage(
                                  parseFloat(e.target.value) || 0
                                )
                              }
                              className="w-20"
                              min="0"
                              max="28"
                              step="1"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="font-medium">Tax Amount:</span>
                          <span className="font-semibold text-lg text-blue-600">
                            {formatCurrency(
                              parseFloat(calculateTaxAmount()),
                              selectedCurrency
                            )}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                          <span className="font-bold text-lg">
                            Grand Total:
                          </span>
                          <span className="font-bold text-xl text-green-600">
                            {formatCurrency(
                              parseFloat(calculateGrandTotal()),
                              selectedCurrency
                            )}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4 mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Additional Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium mb-2 block">
                          Notes
                        </Label>
                        <Textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          placeholder="Add any special notes or terms..."
                          rows={4}
                          className="resize-none"
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Label className="text-sm font-medium">
                            Footer Message
                          </Label>
                          <Button
                            type="button"
                            onClick={refreshFooter}
                            variant="outline"
                            size="sm"
                            className="h-6 w-6 p-0"
                            title="Refresh footer"
                          >
                            <RefreshCw size={12} />
                          </Button>
                        </div>
                        <Textarea
                          value={footer}
                          onChange={(e) => setFooter(e.target.value)}
                          placeholder="Thank you for your business..."
                          rows={2}
                          className="resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Receipt Preview</h2>
          <div className="mb-4 flex items-center">
            <h3 className="text-lg font-medium mr-4">Receipt Type</h3>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt1"
                  checked={theme === "Receipt1"}
                  onChange={() => setTheme("Receipt1")}
                  className="mr-2"
                />
                Receipt1
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt2"
                  checked={theme === "Receipt2"}
                  onChange={() => setTheme("Receipt2")}
                  className="mr-2"
                />
                Receipt2
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt3"
                  checked={theme === "Receipt3"}
                  onChange={() => setTheme("Receipt3")}
                  className="mr-2"
                />
                Receipt3
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="theme"
                  value="Receipt4"
                  checked={theme === "Receipt4"}
                  onChange={() => setTheme("Receipt4")}
                  className="mr-2"
                />
                Receipt4
              </label>
            </div>
          </div>
          <div ref={receiptRef} className="w-[380px] mx-auto border shadow-lg">
            {theme === "Receipt1" && (
              <Receipt1
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  cashier,
                  items,
                  taxPercentage,
                  notes,
                  footer,
                  selectedCurrency,
                }}
              />
            )}
            {theme === "Receipt2" && (
              <Receipt2
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  cashier,
                  items,
                  taxPercentage,
                  notes,
                  footer,
                  selectedCurrency,
                }}
              />
            )}
            {theme === "Receipt3" && (
              <Receipt3
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  cashier,
                  items,
                  taxPercentage,
                  notes,
                  footer,
                  selectedCurrency,
                }}
              />
            )}
            {theme === "Receipt4" && (
              <Receipt4
                data={{
                  billTo,
                  invoice,
                  yourCompany,
                  items,
                  taxPercentage,
                  footer,
                  cashier,
                  selectedCurrency,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
