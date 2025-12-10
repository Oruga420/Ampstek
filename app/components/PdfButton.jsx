'use client';

import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function PdfButton({ targetId }) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    const root = document.getElementById(targetId);
    if (!root || isGenerating) return;
    setIsGenerating(true);

    try {
      const canvas = await html2canvas(root, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        windowWidth: root.scrollWidth,
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.92);
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;
      }

      pdf.save('alejandro-de-la-mora-resume.pdf', { returnPromise: false });
    } catch (error) {
      console.error('PDF generation failed', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <button type="button" className="pdf-button" onClick={handleDownload} disabled={isGenerating}>
      {isGenerating ? 'Preparing PDF…' : 'Download PDF'}
    </button>
  );
}
