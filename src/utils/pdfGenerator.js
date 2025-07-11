export const generatePDF = async (invoiceData, templateNumber) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Lazy load heavy dependencies
      const [
        { default: html2canvas },
        { default: jsPDF },
        { default: InvoiceTemplate },
        { default: ReactDOMServer },
        React,
        { getTemplate },
      ] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
        import("../components/InvoiceTemplate"),
        import("react-dom/server"),
        import("react"),
        import("./templateRegistry"),
      ]);

      const invoice = document.createElement("div");
      document.body.appendChild(invoice);

      // Load the specific template
      const TemplateComponent = await getTemplate(templateNumber);

      const invoiceElement = React.createElement(TemplateComponent, {
        data: invoiceData,
      });
      const invoiceHTML = ReactDOMServer.renderToString(invoiceElement);

      invoice.innerHTML = invoiceHTML;
      invoice.style.width = "210mm";
      invoice.style.height = "297mm";

      const canvas = await html2canvas(invoice, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      pdf.addImage(imgData, "PNG", 0, 0, 210, 297, undefined, "FAST");
      const { number, date, paymentDate } = invoiceData.invoice;
      const { name: companyName } = invoiceData.yourCompany;
      const { name: billToName } = invoiceData.billTo;
      const timestamp = new Date().getTime();

      let fileName;
      switch (templateNumber) {
        case 1:
          fileName = `${number}.pdf`;
          break;
        case 2:
          fileName = `${companyName}_${number}.pdf`;
          break;
        case 3:
          fileName = `${companyName}.pdf`;
          break;
        case 4:
          fileName = `${date}.pdf`;
          break;
        case 5:
          fileName = `${number}-${date}.pdf`;
          break;
        case 6:
          fileName = `invoice_${timestamp}.pdf`;
          break;
        case 7:
          fileName = `Invoice_${number}.pdf`;
          break;
        case 8:
          fileName = `Invoice_${billToName}.pdf`;
          break;
        case 9:
          fileName = `IN-${date}.pdf`;
          break;
        default:
          fileName = `invoice_template_${templateNumber}.pdf`;
      }

      pdf.save(fileName);

      document.body.removeChild(invoice);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};
