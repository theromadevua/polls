import { useState } from 'react';
import ExcelJS from 'exceljs';

interface UseDownloadResponsesProps {
  getFormattedAnswer: (question: Question, answer: any) => string;
}

interface DownloadState {
  isDownloading: boolean;
  error: string | null;
}

export const useDownloadResponses = ({ getFormattedAnswer }: UseDownloadResponsesProps) => {
  const [downloadState, setDownloadState] = useState<DownloadState>({
    isDownloading: false,
    error: null,
  });

  const formatFileName = (title: string): string => {
    const date = new Date().toISOString().split('T')[0];
    const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    return `${sanitizedTitle}-responses-${date}.xlsx`;
  };

  const setupWorksheet = (
    workbook: ExcelJS.Workbook,
    headers: string[]
  ): ExcelJS.Worksheet => {
    const worksheet = workbook.addWorksheet('Survey Responses');

    worksheet.addRow(headers);

    const headerRow = worksheet.getRow(1);
    headerRow.font = {
      bold: true,
      size: 12,
    };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFE0E0E0' },
    };

    return worksheet;
  };

  const addDataRows = (
    worksheet: ExcelJS.Worksheet,
    surveyData: SurveyData,
    responses: any[]
  ): void => {
    responses.forEach(response => {
      const row = [
        new Date(response.createdAt),
        response._id,
      ];

      surveyData.questions.forEach((question:any) => {
        const answerObj = response.answers?.find((a:any) => a.questionId === question._id);
        const formattedAnswer = getFormattedAnswer(question, answerObj?.answer);
        row.push(formattedAnswer);
      });

      worksheet.addRow(row);
    });
  };

  const formatWorksheet = (worksheet: ExcelJS.Worksheet): void => {
    worksheet.columns.forEach((column: any) => {
      let maxLength = 0;
      column.eachCell({ includeEmpty: true }, (cell: any) => {
        const columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = Math.min(maxLength + 2, 50); 
    });

    worksheet.eachRow(row => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });
  };

  const downloadResponses = async (
    surveyData: SurveyData,
    responses: any[]
  ): Promise<void> => {
    if (!surveyData?.questions || !responses.length) {
      setDownloadState({
        isDownloading: false,
        error: 'No data available for download',
      });
      return;
    }

    try {
      setDownloadState({ isDownloading: true, error: null });

      const workbook = new ExcelJS.Workbook();
      const headers = ['Timestamp', 'Response ID', ...surveyData.questions.map((q:any) => q.questionText)];
      
      const worksheet = setupWorksheet(workbook, headers);
      
      addDataRows(worksheet, surveyData, responses);
      
      formatWorksheet(worksheet);

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = formatFileName(surveyData.title);
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloadState({ isDownloading: false, error: null });
    } catch (error) {
      console.error('Error generating Excel file:', error);
      setDownloadState({
        isDownloading: false,
        error: 'Failed to generate download file',
      });
    }
  };

  return {
    downloadResponses,
    isDownloading: downloadState.isDownloading,
    downloadError: downloadState.error,
  };
};
