import { jsPDF } from "jspdf";
import "jspdf-autotable";

export const downloadTimetableAsPDF = (timetable) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");

    // Title
    doc.text("Student Timetable", 20, 10);

    // Table header
    const header = ["Day", "08:00 - 09:30", "09:30 - 11:00", "11:00 - 13:00"];

    // Prepare table body
    const body = timetable.weekdays.map((day) => {
        return [
            day.day,
            day.timeslots.find((slot) => slot.startTime === "08:00")?.coursename || "No Class",
            day.timeslots.find((slot) => slot.startTime === "09:30")?.coursename || "No Class",
            day.timeslots.find((slot) => slot.startTime === "11:00")?.coursename || "No Class"
        ];
    });

    // Create the table
    doc.autoTable({
        head: [header],
        body: body,
        startY: 20,
        theme: 'grid',
        headStyles: { fillColor: [41, 128, 185] }, // Custom header color
        margin: { top: 30, left: 20, right: 20 },
    });

    // Download PDF
    doc.save("timetable.pdf");
};
