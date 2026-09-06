import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Capture card as canvas
 */
async function captureCard(element) {
  if (!element) {
    throw new Error("Membership card element not found.");
  }

  try {
    return await html2canvas(element, {
      scale: 3,
      useCORS: true,
      allowTaint: false,
      backgroundColor: "#ffffff",
      logging: false,
      imageTimeout: 15000,
      removeContainer: true,
      foreignObjectRendering: false,
    });
  } catch (error) {
    console.error("html2canvas error:", error);
    throw new Error("Failed to capture membership card.");
  }
}

/**
 * Download Membership Card as PNG
 */
export async function downloadCard(element, filename = "membership-card.png") {
  try {
    const canvas = await captureCard(element);

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Download Membership Card as PDF
 */
export async function downloadCardPDF(
  element,
  filename = "membership-card.pdf"
) {
  try {
    const canvas = await captureCard(element);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a5",
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const margin = 5;

    const imgWidth = pageWidth - margin * 2;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const y = (pageHeight - imgHeight) / 2;

    pdf.addImage(
      imgData,
      "PNG",
      margin,
      y,
      imgWidth,
      imgHeight
    );

    pdf.save(filename);

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Print Membership Card
 */
export async function printCard(element) {
  try {
    const canvas = await captureCard(element);

    const image = canvas.toDataURL("image/png");

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      throw new Error("Popup blocked. Please allow popups for printing.");
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>UNSATA Membership Card</title>

        <style>
          *{
            box-sizing:border-box;
          }

          body{
            margin:0;
            padding:20px;
            display:flex;
            justify-content:center;
            align-items:center;
            background:#f5f5f5;
          }

          img{
            max-width:100%;
            height:auto;
          }

          @media print{
            body{
              background:white;
              padding:0;
            }
          }
        </style>

      </head>

      <body>

        <img src="${image}" alt="Membership Card"/>

      </body>

      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 700);

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
}