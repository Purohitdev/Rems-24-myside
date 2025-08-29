import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  headerBg?: string;
  borderColor?: string;
  shadow?: boolean;
  rowsPerPage?: number; // optional, if not provided -> show all rows
}

export default function DataTable({
  columns,
  data,
  headerBg = "#333333",
  borderColor = "#959595",
  shadow = true,
  rowsPerPage,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Convert hex to rgba
  const hexToRgba = (hex: string, opacity: number) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const borderStyle = { border: `1px solid ${hexToRgba(borderColor, 0.1)}` };

  // Pagination logic (only if rowsPerPage is provided)
  const totalPages = rowsPerPage ? Math.ceil(data.length / rowsPerPage) : 1;
  const startIndex = rowsPerPage ? (currentPage - 1) * rowsPerPage : 0;
  const currentData = rowsPerPage ? data.slice(startIndex, startIndex + rowsPerPage) : data;

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <>

      <div
        className={`overflow-x-auto rounded-lg ${shadow ? "shadow-xs" : ""}`}
        // style={{ border: `1px solid ${hexToRgba(borderColor, 0.1)}` }}
      >
        <table className="min-w-full text-sm border-separate border-spacing-0">
          <thead style={{ backgroundColor: headerBg }} className="text-white">
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-center ${idx === 0 ? "rounded-l-md" : ""} ${idx === columns.length - 1 ? "rounded-r-md" : ""
                    }`}
                  style={borderStyle}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row, idx) => (
              <tr key={idx}>
                {columns.map((col, cIdx) => (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-center bg-white ${cIdx === 0 ? "rounded-l-md" : ""} ${cIdx === columns.length - 1 ? "rounded-r-md" : ""
                      }`}
                    style={borderStyle}
                  >
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>


      </div>







      {rowsPerPage && totalPages > 1 && (
        <div className="flex justify-end py-6   ">
     <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white shadow-md">
          {/* Previous */}
         <button
  onClick={() => goToPage(currentPage - 1)}
  disabled={currentPage === 1}
  className="px-3 py-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
>
  <ChevronLeft size={16} />
</button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === page
                  ? "bg-green-700 text-white font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
                }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
        <button
  onClick={() => goToPage(currentPage + 1)}
  disabled={currentPage === totalPages}
  className="px-3 py-1 rounded-full hover:bg-gray-200 disabled:opacity-50"
>
  <ChevronRight size={16} />
</button>
     </div>
        </div>
      )}

    </>


  );
}
