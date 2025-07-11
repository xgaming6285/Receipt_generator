import { useState, useEffect } from "react";
import { getTemplate } from "../utils/templateRegistry";

const InvoiceTemplate = ({ data, templateNumber }) => {
  const [Template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setLoading(true);
        setError(null);
        const TemplateComponent = await getTemplate(templateNumber);
        setTemplate(() => TemplateComponent);
      } catch (err) {
        setError(err);
        console.error("Error loading template:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [templateNumber]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-red-500">Error loading template</div>
      </div>
    );
  }

  if (!Template) {
    return null;
  }

  return <Template data={data} />;
};

export default InvoiceTemplate;
