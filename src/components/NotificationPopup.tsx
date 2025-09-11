import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { X, CheckCircle } from 'lucide-react';

interface NotificationData {
  name: string;
  service: string;
  location: string;
}

const NotificationPopup: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [currentNotification, setCurrentNotification] = useState<NotificationData | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Load Excel data on component mount
  useEffect(() => {
    const loadExcelData = async () => {
      try {
        const response = await fetch('/Name list.xlsx');
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });
        
        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convert to JSON - try both with and without headers
        let jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Parse the data
        const parsedData: NotificationData[] = [];

        // Check if first row contains headers (Name, Service, Location)
        const firstRow = jsonData[0] as any[];
        const hasHeaders = firstRow &&
          (firstRow[0]?.toString().toLowerCase().includes('name') ||
           firstRow[1]?.toString().toLowerCase().includes('location') ||
           firstRow[2]?.toString().toLowerCase().includes('service'));

        const startIndex = hasHeaders ? 1 : 0;

        for (let i = startIndex; i < jsonData.length; i++) {
          const row = jsonData[i] as any[];
          if (row && row.length >= 3 && row[0] && row[1] && row[2]) {
            parsedData.push({
              name: row[0].toString().trim(),
              location: row[1].toString().trim(),
              service: row[2].toString().trim()
            });
          }
        }
        
        console.log(`Loaded ${parsedData.length} notifications from Excel file`);
        setNotifications(parsedData);
      } catch (error) {
        console.error('Error loading Excel file:', error);
        // Fallback data for testing
        setNotifications([
          { name: "Rahul Sharma", service: "Health Insurance", location: "Mumbai" },
          { name: "Priya Patel", service: "SIP Investment", location: "Delhi" },
          { name: "Amit Kumar", service: "Retirement Planning", location: "Bangalore" },
          { name: "Sneha Gupta", service: "Financial Planning", location: "Pune" },
          { name: "Vikash Singh", service: "Term Insurance", location: "Chennai" },
          { name: "Anita Desai", service: "Motor Insurance", location: "Hyderabad" },
          { name: "Rajesh Khanna", service: "Health Insurance", location: "Kolkata" },
          { name: "Meera Joshi", service: "SIP Investment", location: "Ahmedabad" }
        ]);
      }
    };

    loadExcelData();
  }, []);

  // Show notifications every 15 seconds
  useEffect(() => {
    if (notifications.length === 0) return;

    const showNotification = () => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex % notifications.length;
        const notification = notifications[nextIndex];
        setCurrentNotification(notification);
        setIsVisible(true);

        // Hide notification after 5 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 5000);

        return (nextIndex + 1) % notifications.length;
      });
    };

    // Show first notification after 15 seconds
    const initialTimeout = setTimeout(showNotification, 15000);

    // Then show every 20 seconds
    const interval = setInterval(showNotification, 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [notifications]);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!currentNotification || !isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-[60] animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm sm:max-w-sm max-w-[280px]">
        <div className="flex items-start gap-2 sm:gap-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-green-600 uppercase tracking-wide">
                Just Now
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-900 font-medium leading-tight">
              <span className="font-semibold text-primary">{currentNotification.name}</span> has booked an appointment for{' '}
              <span className="font-semibold text-primary">{currentNotification.service}</span> from{' '}
              <span className="font-semibold text-primary">{currentNotification.location}</span>
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close notification"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;
