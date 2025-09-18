/**
 * Generic export utilities for all tool results
 */

export type ExportFormat = 'json' | 'csv' | 'pdf' | 'markdown';

/**
 * Generate JSON export from tool result
 */
export function generateJSON(data: any, pretty: boolean = true): string {
  return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}

/**
 * Generate CSV export from tool result
 * Attempts to flatten nested objects and arrays
 */
export function generateCSV(data: any): string {
  const lines: string[] = [];

  // Handle different data structures
  if (Array.isArray(data)) {
    // Array of objects - typical tabular data
    if (data.length > 0 && typeof data[0] === 'object') {
      // Extract headers from first object
      const headers = Object.keys(data[0]);
      lines.push(headers.join(','));

      // Add data rows
      data.forEach(row => {
        const values = headers.map(header => {
          const value = row[header];
          return formatCSVValue(value);
        });
        lines.push(values.join(','));
      });
    } else {
      // Simple array
      lines.push('Value');
      data.forEach(item => {
        lines.push(formatCSVValue(item));
      });
    }
  } else if (typeof data === 'object' && data !== null) {
    // Single object - create key-value pairs
    lines.push('Property,Value');
    Object.entries(data).forEach(([key, value]) => {
      lines.push(`${formatCSVValue(key)},${formatCSVValue(value)}`);
    });
  } else {
    // Primitive value
    lines.push('Value');
    lines.push(formatCSVValue(data));
  }

  return lines.join('\n');
}

/**
 * Format a value for CSV export
 */
function formatCSVValue(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return `"${value.join('; ')}"`;
    }
    return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
  }

  const str = String(value);
  // Quote if contains comma, quotes, or newlines
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Generate Markdown export from tool result
 */
export function generateMarkdown(data: any, title?: string): string {
  const lines: string[] = [];

  if (title) {
    lines.push(`# ${title}`);
    lines.push('');
  }

  lines.push('## Tool Result');
  lines.push('');

  // Format the data based on its structure
  if (Array.isArray(data)) {
    if (data.length > 0 && typeof data[0] === 'object') {
      // Create a table for array of objects
      const headers = Object.keys(data[0]);
      lines.push('| ' + headers.join(' | ') + ' |');
      lines.push('| ' + headers.map(() => '---').join(' | ') + ' |');

      data.forEach(row => {
        const values = headers.map(header => {
          const value = row[header];
          return formatMarkdownValue(value);
        });
        lines.push('| ' + values.join(' | ') + ' |');
      });
    } else {
      // Simple list
      lines.push('### Values');
      data.forEach((item, index) => {
        lines.push(`${index + 1}. ${formatMarkdownValue(item)}`);
      });
    }
  } else if (typeof data === 'object' && data !== null) {
    // Format object as sections
    Object.entries(data).forEach(([key, value]) => {
      lines.push(`### ${key}`);
      lines.push('');

      if (Array.isArray(value)) {
        value.forEach(item => {
          lines.push(`- ${formatMarkdownValue(item)}`);
        });
      } else if (typeof value === 'object' && value !== null) {
        lines.push('```json');
        lines.push(JSON.stringify(value, null, 2));
        lines.push('```');
      } else {
        lines.push(formatMarkdownValue(value));
      }
      lines.push('');
    });
  } else {
    lines.push(formatMarkdownValue(data));
  }

  return lines.join('\n');
}

/**
 * Format a value for Markdown export
 */
function formatMarkdownValue(value: any): string {
  if (value === null || value === undefined) {
    return '_N/A_';
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map(v => formatMarkdownValue(v)).join(', ');
    }
    return `\`${JSON.stringify(value)}\``;
  }

  const str = String(value);
  // Escape markdown special characters if needed
  return str.replace(/[*_`]/g, '\\$&');
}

const wrapCard = (inner: string) => `<div class="card">${inner}</div>`;

function formatDataAsHTML(data: any): string {
  if (Array.isArray(data)) {
    if (data.length > 0 && typeof data[0] === 'object') {
      const headers = Object.keys(data[0]);
      return wrapCard(`
        <h2>Results</h2>
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${data.map(row => `
              <tr>
                ${headers.map(h => `<td>${formatHTMLValue(row[h])}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      `);
    }

    return wrapCard(`
      <h2>Values</h2>
      <ol>
        ${data.map(item => `<li>${formatHTMLValue(item)}</li>`).join('')}
      </ol>
    `);
  }

  if (typeof data === 'object' && data !== null) {
    const sections = Object.entries(data)
      .map(([key, value]) => {
        let content = '';

        if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object') {
          const headers = Object.keys(value[0]);
          content = `
            <table>
              <thead>
                <tr>
                  ${headers.map(h => `<th>${h}</th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${value
                  .map(
                    row => `
                  <tr>
                    ${headers.map(h => `<td>${formatHTMLValue(row[h])}</td>`).join('')}
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          `;
        } else if (Array.isArray(value)) {
          content = `
            <ul>
              ${value.map(item => `<li>${formatHTMLValue(item)}</li>`).join('')}
            </ul>
          `;
        } else if (typeof value === 'object' && value !== null) {
          content = `<pre>${JSON.stringify(value, null, 2)}</pre>`;
        } else {
          content = `<p>${formatHTMLValue(value)}</p>`;
        }

        return wrapCard(`
          <h3>${key}</h3>
          ${content}
        `);
      })
      .join('');

    return sections || wrapCard('<p>No details available.</p>');
  }

  return wrapCard(`<p class="value">${formatHTMLValue(data)}</p>`);
}

function formatHTMLValue(value: any): string {
  if (value === null || value === undefined) {
    return '<em>N/A</em>';
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  if (typeof value === 'number') {
    return Number.isInteger(value)
      ? value.toLocaleString()
      : value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return value.map(v => formatHTMLValue(v)).join(', ');
    }
    return `<code>${JSON.stringify(value)}</code>`;
  }

  const str = String(value);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function downloadFile(content: string | BlobPart, filename: string, mimeType: string) {
  if (typeof window === 'undefined') {
    console.error('downloadFile can only be called on the client side');
    return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate HTML for PDF export from tool result
 */
export function generateHTML(
  data: any,
  title?: string,
  generatedBy?: { name?: string | null; email?: string | null }
): string {
  const htmlTitle = title || 'Tool Result Export';
  const generatedByLine = generatedBy?.name || generatedBy?.email
    ? `<p><strong>Generated By:</strong> ${[
        generatedBy?.name,
        generatedBy?.email
      ]
        .filter(Boolean)
        .join(' · ')}</p>`
    : '';

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset=\"utf-8\">
    <title>${htmlTitle}</title>
    <style>
      @media print {
        body {
          margin: 0;
          padding: 20px;
        }
        .page-break {
          page-break-before: always;
        }
      }

      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        margin: 0;
        padding: 0;
        color: #0f172a;
        background: #ffffff;
        line-height: 1.6;
      }

      .page-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 40px;
      }

      /* Header section */
      .header {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        margin-bottom: 30px;
        border-bottom: 2px solid #e2e8f0;
      }

      .header-logo {
        display: flex;
        align-items: center;
        padding-right: 20px;
        border-right: 1px solid #cbd5e1;
      }

      .header-logo svg {
        height: 32px;
        width: auto;
      }

      .header-title {
        flex: 1;
        padding-left: 20px;
      }

      .header-title h1 {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
        color: #0f172a;
        letter-spacing: -0.025em;
      }

      /* Content styling */
      h2 {
        color: #0f172a;
        margin-top: 0;
      }
      h3 {
        color: #1f2937;
        margin-top: 24px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 16px 0;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        overflow: hidden;
      }
      th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #e2e8f0;
        vertical-align: top;
      }
      th {
        background-color: #eff6ff;
        font-weight: 600;
        color: #1d4ed8;
      }
      tr:last-child td {
        border-bottom: none;
      }
      pre {
        background-color: #0f172a;
        color: #e2e8f0;
        padding: 15px;
        border-radius: 12px;
        overflow-x: auto;
      }
      .value {
        font-family: 'Courier New', monospace;
        background-color: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
      }
      .card {
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 24px;
      }
      .card + .card {
        margin-top: 24px;
      }

      /* Footer metadata */
      .metadata-footer {
        background-color: #f1f5f9;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 16px 20px;
        margin-top: 40px;
        font-size: 14px;
      }
      .metadata-footer p {
        margin: 4px 0;
        color: #475569;
      }
      .metadata-footer strong {
        color: #334155;
        font-weight: 600;
      }
    </style>
  </head>
  <body>
    <div class=\"page-container\">
      <!-- Header -->
      <div class=\"header\">
        <div class=\"header-logo\">
          <svg width=\"40\" height=\"40\" viewBox=\"0 0 40 40\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">
            <rect width=\"40\" height=\"40\" rx=\"8\" fill=\"#1d4ed8\"/>
            <path d=\"M12 20L12 28\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/>
            <path d=\"M18 16L18 28\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/>
            <path d=\"M24 12L24 28\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/>
            <path d=\"M30 18L30 28\" stroke=\"white\" stroke-width=\"2\" stroke-linecap=\"round\"/>
          </svg>
        </div>
        <div class=\"header-title\">
          <h1>${htmlTitle}</h1>
        </div>
      </div>

      <!-- Result Data -->
      ${formatDataAsHTML(data)}

      <!-- Footer Metadata -->
      <div class=\"metadata-footer\">
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Format:</strong> Tool Result Export</p>
        ${generatedByLine}
      </div>
    </div>
  </body>
</html>`;
}


export function downloadJSON(data: any, filename: string = 'export.json') {
  const content = generateJSON(data);
  downloadFile(content, filename, 'application/json');
}

export function downloadCSV(data: any, filename: string = 'export.csv') {
  const content = generateCSV(data);
  downloadFile(content, filename, 'text/csv');
}

export function downloadMarkdown(data: any, filename: string = 'export.md', title?: string) {
  const content = generateMarkdown(data, title);
  downloadFile(content, filename, 'text/markdown');
}

export function downloadHTML(
  data: any,
  filename: string = 'export.html',
  title?: string,
  generatedBy?: { name?: string | null; email?: string | null }
) {
  const content = generateHTML(data, title, generatedBy);
  downloadFile(content, filename, 'text/html');
}

export function downloadPDF(
  data: any,
  filename: string = 'export.pdf',
  title?: string,
  generatedBy?: { name?: string | null; email?: string | null }
) {
  if (typeof window === 'undefined') {
    console.error('downloadPDF can only be called on the client side');
    return;
  }

  const printableTitle = title ?? (filename.replace(/\.pdf$/i, '') || 'Tool Result');
  openPDFPrint(data, printableTitle, generatedBy);
}

export function openPDFPrint(
  data: any,
  title?: string,
  generatedBy?: { name?: string | null; email?: string | null }
) {
  if (typeof window === 'undefined') {
    console.error('openPDFPrint can only be called on the client side');
    return;
  }

  const htmlContent = generateHTML(data, title, generatedBy);
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);

  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.onload = () => {
      setTimeout(() => {
        printWindow.print();
      }, 500);
    };
  }

  setTimeout(() => URL.revokeObjectURL(url), 10000);
}
