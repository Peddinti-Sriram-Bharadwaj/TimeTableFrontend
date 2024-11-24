import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateTimetablePDF = (timeSlots, weekdays, timetableStructure) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Student Timetable", 14, 22);

    const headers = ["Time", ...weekdays];
    const data = timeSlots.map(slot => [
        `${slot.startTime} - ${slot.endTime}`,
        ...weekdays.map(day => timetableStructure[day].find(s => s.startTime === slot.startTime)?.coursename || "empty slot"),
    ]);

    doc.autoTable({
        head: [headers],
        body: data,
        startY: 30,
    });

    doc.save("timetable.pdf");
};
