"use client";
import React, { useState, KeyboardEvent } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import Image from "next/image";

interface WhatsAppChatButtonProps {
  defaultMessage?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  primaryColor?: "whatsapp" | "blue" | "green" | "purple";
  showNotificationBadge?: boolean;
  notificationCount?: number;
  companyName?: string;
  supportHours?: string;
  responseTime?: string;
  showQuickActions?: boolean;
  quickActions?: { label: string; message: string }[];
  phoneNumber?: string; // Added as prop instead of env variable for demo
}

const WhatsAppChatButton: React.FC<WhatsAppChatButtonProps> = ({
  defaultMessage = "Hi! I'm interested in your services.",
  position = "bottom-right",
  primaryColor = "whatsapp",
  showNotificationBadge = false,
  notificationCount = 1,
  companyName = "Nimal Safari Contact ",
  supportHours = "Mon-Fri 9AM-6PM",
  responseTime = "Usually replies within an hour",
  showQuickActions = true,
  quickActions = [
    {
      label: "Book a Safari",
      message:
        "Hi! I’d like to book a safari. Can you help me with the available packages?",
    },
    {
      label: "Safari Package Info",
      message:
        "Hello! Could you please share more details about your safari packages and timings?",
    },
    {
      label: "Wildlife Spotting Info",
      message: "Hi! What kind of animals can I expect to see during a safari?",
    },
    {
      label: "General Inquiry",
      message: "Hi! I have a few general questions about Nimal Safari.",
    },
  ],
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, // Demo phone number
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customMessage, setCustomMessage] = useState<string>(defaultMessage);

  const toggleChat = (): void => {
    setIsOpen(!isOpen);
  };

  const openWhatsApp = (message: string = customMessage): void => {
    // Clean phone number (remove any non-digits)
    const cleanPhoneNumber = phoneNumber ? phoneNumber.replace(/\D/g, "") : "";

    // Validate phone number
    if (!cleanPhoneNumber) {
      alert(
        "WhatsApp phone number is not configured. Please contact the administrator."
      );
      return;
    }

    // Clean and encode message for URL
    const cleanMessage = message.trim();
    const encodedMessage = encodeURIComponent(cleanMessage);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;

    console.log("Opening WhatsApp with:", {
      phoneNumber: cleanPhoneNumber,
      message: cleanMessage,
      url: whatsappUrl,
    });

    // Try to open WhatsApp in new tab with better popup handling
    try {
      const newWindow = window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      // Check if popup was blocked after a short delay
      setTimeout(() => {
        if (newWindow && (newWindow.closed || !newWindow.location)) {
          // Popup was likely blocked, but don't redirect current tab
          console.warn(
            "Popup blocked. Please allow popups for this site or manually copy the WhatsApp link."
          );

          // Optional: Show user-friendly message instead of redirecting
          alert(
            "Please allow popups for this site to open WhatsApp, or copy this link: " +
              whatsappUrl
          );

          // Alternative: Copy to clipboard
          if (navigator.clipboard) {
            navigator.clipboard
              .writeText(whatsappUrl)
              .then(() => {
                alert("WhatsApp link copied to clipboard!");
              })
              .catch(() => {
                console.error("Failed to copy to clipboard");
              });
          }
        }
      }, 100);
    } catch (error) {
      console.error("Error opening WhatsApp:", error);
      // Don't redirect current tab - just show error
      alert("Unable to open WhatsApp. Please try again or contact support.");
    }

    // Close the chat widget
    setIsOpen(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendCustomMessage();
    }
  };

  const handleQuickAction = (actionMessage: string): void => {
    console.log("Quick action clicked:", actionMessage);
    openWhatsApp(actionMessage);
  };

  const handleSendCustomMessage = (): void => {
    console.log("Send custom message clicked:", customMessage);
    if (customMessage.trim()) {
      openWhatsApp(customMessage);
    } else {
      alert("Please enter a message before sending");
    }
  };

  const getPositionClasses = (): string => {
    switch (position) {
      case "bottom-left":
        return "bottom-6 left-6";
      case "top-right":
        return "top-6 right-6";
      case "top-left":
        return "top-6 left-6";
      default:
        return "bottom-6 right-6";
    }
  };

  const getChatWindowPosition = (): string => {
    switch (position) {
      case "bottom-left":
        return "bottom-24 left-6";
      case "top-right":
        return "top-24 right-6";
      case "top-left":
        return "top-24 left-6";
      default:
        return "bottom-24 right-6";
    }
  };

  const colorClasses = {
    whatsapp: {
      primary: "bg-green-500 hover:bg-green-600",
      secondary: "bg-green-50 text-green-700",
      button: "bg-green-500 hover:bg-green-600",
      ring: "focus:ring-green-500",
    },
    blue: {
      primary: "bg-blue-600 hover:bg-blue-700",
      secondary: "bg-blue-50 text-blue-700",
      button: "bg-blue-600 hover:bg-blue-700",
      ring: "focus:ring-blue-500",
    },
    green: {
      primary: "bg-green-600 hover:bg-green-700",
      secondary: "bg-green-50 text-green-700",
      button: "bg-green-600 hover:bg-green-700",
      ring: "focus:ring-green-500",
    },
    purple: {
      primary: "bg-purple-600 hover:bg-purple-700",
      secondary: "bg-purple-50 text-purple-700",
      button: "bg-purple-600 hover:bg-purple-700",
      ring: "focus:ring-purple-500",
    },
  };

  const currentColorClasses = colorClasses[primaryColor];

  // Don't render if no phone number is configured
  if (!phoneNumber) {
    console.warn("Phone number is not set");
    return null;
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed ${getChatWindowPosition()} w-80 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 animate-in slide-in-from-bottom-2 duration-300 max-h-96`}
        >
          {/* Header */}
          <div
            className={`${currentColorClasses.primary} text-white p-4 rounded-t-lg flex justify-between items-center`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <Image
                  src="/Images/logo.png"
                  alt="logo"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">{companyName}</h3>
                <p className="text-xs opacity-90">{responseTime}</p>
              </div>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4 flex-1 overflow-y-auto">
            {/* Welcome Message */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                👋 Hello! Ready to chat on WhatsApp?
              </p>
              <p className="text-xs text-gray-500">{supportHours}</p>
            </div>

            {/* Quick Actions */}
            {showQuickActions && quickActions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">
                  Quick Actions:
                </p>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleQuickAction(action.message);
                    }}
                    className={`w-full text-left p-2 rounded-lg ${currentColorClasses.secondary} hover:opacity-80 transition-opacity text-sm cursor-pointer border border-transparent hover:border-gray-300`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Custom Message Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Or send a custom message:
              </label>
              <textarea
                value={customMessage}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setCustomMessage(e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${currentColorClasses.ring} focus:border-transparent resize-none`}
                rows={3}
                aria-label="Custom message"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSendCustomMessage();
              }}
              className={`w-full ${currentColorClasses.button} text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer`}
              aria-label="Open WhatsApp"
            >
              <MessageCircle size={16} />
              <span>Continue on WhatsApp</span>
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              This will open WhatsApp Web or App
            </p>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed ${getPositionClasses()} w-14 h-14 ${
          currentColorClasses.primary
        } text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 flex items-center justify-center group`}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        {isOpen ? (
          <X size={24} className="transition-transform group-hover:rotate-90" />
        ) : (
          <MessageCircle
            size={24}
            className="transition-transform group-hover:scale-110"
          />
        )}

        {/* Notification dot */}
        {!isOpen && showNotificationBadge && notificationCount > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-bold">
              {notificationCount > 9 ? "9+" : notificationCount}
            </span>
          </div>
        )}

        {/* WhatsApp indicator */}
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full flex items-center justify-center">
          <Phone size={10} className="text-white" />
        </div>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={toggleChat}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export type { WhatsAppChatButtonProps };
export default WhatsAppChatButton;
