import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

const BlankFormat = () => {
  const [downloading, setDownloading] = useState(null);

  const pdfFiles = [
    "MCQ-Question-Set.pdf",
    "Assignment-Form.pdf",
    "Student-Progress-Report.pdf",
    "Instructor-Evaluation.pdf",
    "Quiz-Template.pdf",
    "Final-Exam-AnswerSheet.pdf",
    "Course-Feedback-Form.pdf",
    "Result-Analysis.pdf",
    "Certification-Checklist.pdf",
    "Training-Attendance-Form.pdf",
  ];

  const handleDownload = async (e, fileName) => {
    e.preventDefault();
    if (downloading === fileName) return;

    try {
      setDownloading(fileName);
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // ===== Header =====
      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text("Learning Quiz Platform", 105, 20, { align: "center" });

      doc.setFontSize(14);
      doc.text(fileName.replace(".pdf", "").replaceAll("-", " "), 105, 30, {
        align: "center",
      });

      // Line separator
      doc.setLineWidth(0.4);
      doc.line(20, 35, 190, 35);

      doc.setFontSize(12);
      doc.text("Blank Table Format:", 20, 45);

      // ===== Table =====
      const startY = 55;
      const rowHeight = 10;
      const colWidths = [20, 60, 60, 40];
      const tableHeader = [
        "SL",
        "Question / Description",
        "Details / Answer",
        "Remarks",
      ];

      let x = 20;
      tableHeader.forEach((text, i) => {
        doc.setFont("helvetica", "bold");
        doc.rect(x, startY, colWidths[i], rowHeight);
        doc.text(text, x + 2, startY + 7);
        x += colWidths[i];
      });

      // 15 blank rows
      for (let r = 1; r <= 15; r++) {
        x = 20;
        const y = startY + rowHeight * r;
        for (let i = 0; i < colWidths.length; i++) {
          doc.rect(x, y, colWidths[i], rowHeight);
          if (i === 0) doc.text(String(r), x + 2, y + 7);
          x += colWidths[i];
        }
      }

      // ✅ Download without reload
      const blob = doc.output("blob");
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("PDF generate korte somossa hocche!");
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="p-8 min-h-screen  flex flex-col items-center">
      <Helmet>
        <title>Learning Quiz Platform | Blank Formats</title>
      </Helmet>

      <h1 className="text-2xl md:text-3xl font-bold text-black mb-6 flex items-center gap-2">
        <FileText className="w-8 h-8 text-black" /> Learning Quiz Platform -
        Blank PDFs
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1400px] mx-auto">
        {pdfFiles.map((fileName, index) => (
          <div
            key={index}
            className="bg-white shadow-md border border-gray-200 rounded-xl p-5 flex flex-col justify-between hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center gap-2">
              <FileText className="text-indigo-600 w-5 h-5" />
              <p className="text-gray-800 font-semibold text-sm">{fileName}</p>
            </div>
            <button
              onClick={(e) => handleDownload(e, fileName)}
              disabled={downloading === fileName}
              className={`mt-4 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition text-white ${
                downloading === fileName
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-bgButton hover:bg-hoverBgButton"
              }`}
            >
              <Download className="w-4 h-4" />
              {downloading === fileName ? "Generating..." : "Download"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlankFormat;
