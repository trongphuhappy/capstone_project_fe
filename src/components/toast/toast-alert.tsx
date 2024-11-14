type NotificationType = "success" | "warning" | "error";

interface ToastAlertProps {
  type: NotificationType; // This is type for alert
  title?: string;
  description?: string; // Show description
  dateTime?: Date; // Show description
  onClose?: any;
}

const notificationTypes = {
  success: {
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    icon: "✅",
    title: "Success",
    textColor: "text-green-500",
  },
  warning: {
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-300",
    icon: "⚠️",
    title: "Warning",
    textColor: "text-yellow-500",
  },
  error: {
    bgColor: "bg-red-50",
    borderColor: "border-red-300",
    icon: "❌",
    title: "Error",
    textColor: "text-red-500",
  },
};

function ToastAlert({ type, description, dateTime, onClose }: ToastAlertProps) {
  // Get property in notificationTypes
  const { bgColor, borderColor, icon, textColor, title } =
    notificationTypes[type];

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const displayTime = formatTime(dateTime || new Date());

  return (
    <div
      className={`border ${borderColor} rounded-md w-[400px] ${bgColor} flex flex-col border-l-4 ${
        type === "success"
          ? "bg-white border-l-green-500 text-green-500"
          : type === "error"
          ? "bg-white border-l-red-500 text-red-500"
          : type === "warning"
          ? "bg-white border-l-yellow-500 text-yellow-500"
          : ""
      }`}
    >
      <div className="relative py-4 pl-4 pr-10">
        <div className="flex items-start gap-2">
          <div className="text-green-600 text-xl"> {icon}</div>
          <div>
            <strong className={`${textColor}`}>{title}</strong>
            <div className="text-gray-600 text-sm mt-1">{description}</div>
          </div>
        </div>
        {onClose && (
          <button
            onClick={() => onClose()}
            className="absolute top-2 right-3 group"
          >
            <span className="text-xs block">&#10005;</span>
          </button>
        )}

        <div className="text-right text-gray-500 text-xs mt-2">
          {displayTime}
        </div>
      </div>
    </div>
  );
}

export default ToastAlert;
