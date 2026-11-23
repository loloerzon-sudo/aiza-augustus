import React, { useState } from 'react';
import { Calendar, ChevronDown, Check } from 'lucide-react';

export const AddToCalendar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const eventDetails = {
    title: 'Aiza & Augustus Wedding',
    description: 'Save the Date! Aiza & Augustus are getting married at Viridis Countryside Garden, Amadeo, Cavite.',
    location: 'Viridis Countryside Garden, Amadeo, Cavite, Philippines',
    start: '20270227T070000Z', // 3:00 PM PHT = 07:00 UTC
    end: '20270227T140000Z',   // 10:00 PM PHT = 14:00 UTC
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventDetails.title
  )}&dates=${eventDetails.start}/${eventDetails.end}&details=${encodeURIComponent(
    eventDetails.description
  )}&location=${encodeURIComponent(eventDetails.location)}`;

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aiza & Augustus Wedding//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `SUMMARY:${eventDetails.title}`,
      `DESCRIPTION:${eventDetails.description}`,
      `LOCATION:${eventDetails.location}`,
      `DTSTART:${eventDetails.start}`,
      `DTEND:${eventDetails.end}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Aiza-and-Augustus-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="relative inline-block w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl liquid-glass-warm hover:bg-white/90 text-[#5C3D24] text-xs font-sans tracking-wider uppercase font-semibold transition-all duration-300 shadow-xs hover:shadow-md active:scale-[0.99] cursor-pointer"
      >
        <Calendar size={15} className="text-[#B85D3B]" />
        <span>Add to Calendar</span>
        <ChevronDown size={14} className={`text-[#8C592C] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 py-2 liquid-glass-warm rounded-xl shadow-xl z-30 text-left overflow-hidden">
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-xs text-[#422D1D] hover:bg-[#F7F1E7] transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-[#4285F4]"></span>
            Google Calendar
          </a>
          <button
            onClick={handleDownloadICS}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#422D1D] hover:bg-[#F7F1E7] transition-colors text-left cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#6F7D59]"></span>
            {downloaded ? (
              <span className="flex items-center gap-1 text-[#B85D3B] font-medium">
                <Check size={13} /> Downloaded (.ics)
              </span>
            ) : (
              'Apple / Outlook / Other (.ics)'
            )}
          </button>
        </div>
      )}
    </div>
  );
};
