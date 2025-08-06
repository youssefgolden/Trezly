type AlertProps = {
    message: string;
    type?: "error" | "success" | "info";
  };
  
  export default function Alert({ message, type = "error" }: AlertProps) {
    const colorMap = {
      error: "bg-red-100 text-red-700 border-red-400",
      success: "bg-green-100 text-green-700 border-green-400",
      info: "bg-blue-100 text-blue-700 border-blue-400",
    };
  
    return (
      <div className={`border px-4 py-3 rounded relative mb-4 ${colorMap[type]}`} role="alert">
        <strong className="font-bold capitalize">{type}:</strong>
        <span className="block sm:inline ml-1">{message}</span>
      </div>
    );
  }
  