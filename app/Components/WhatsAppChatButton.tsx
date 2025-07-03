"use client";
import React, { useState, KeyboardEvent, useRef } from "react";
import { MessageCircle, X, Phone } from "lucide-react";
import Image from "next/image";
import { gsap } from "gsap";

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
  phoneNumber?: string;
}

const WhatsAppChatButton: React.FC<WhatsAppChatButtonProps> = ({
  defaultMessage = "Hi! I'm interested in your services.",
  position = "bottom-right",
  primaryColor = "whatsapp",
  showNotificationBadge = false,
  notificationCount = 1,
  companyName = "Nimal Safari Contact ",
  // supportHours = "Mon-Fri 9AM-6PM",
  responseTime = "Usually replies within an hour",
  showQuickActions = true,
  quickActions = [
    {
      label: "Book a Safari",
      message:
        "Hi! I'd like to book a safari. Can you help me with the available packages?",
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
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [customMessage, setCustomMessage] = useState<string>(defaultMessage);

  // Animation refs
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const quickActionsRef = useRef<HTMLDivElement>(null);
  const customMessageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Animation functions
  const openChatWindow = (): void => {
    const chatWindow = chatWindowRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const footer = footerRef.current;
    const backdrop = backdropRef.current;
    const quickActions = quickActionsRef.current;
    const customMessage = customMessageRef.current;

    if (!chatWindow) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Set initial states
    gsap.set(chatWindow, {
      scale: 0.8,
      opacity: 0,
      y: 50,
      transformOrigin: position.includes("bottom") ? "bottom" : "top",
    });
    gsap.set(header, { y: -20, opacity: 0 });
    gsap.set(content, { y: 20, opacity: 0 });
    gsap.set(footer, { y: 20, opacity: 0 });
    gsap.set(backdrop, { opacity: 0 });

    if (quickActions) {
      const quickActionItems = quickActions.querySelectorAll("button");
      gsap.set(quickActionItems, { x: -30, opacity: 0 });
    }

    if (customMessage) {
      gsap.set(customMessage, { y: 20, opacity: 0 });
    }

    // Create opening animation timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Animate chat window container
    tl.to(chatWindow, {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "back.out(1.7)",
    })
      // Animate backdrop
      .to(
        backdrop,
        {
          opacity: 1,
          duration: 0.3,
        },
        0.1
      )
      // Animate header
      .to(
        header,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0.2
      )
      // Animate content
      .to(
        content,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0.3
      )
      // Animate quick actions
      .to(
        quickActions ? quickActions.querySelectorAll("button") : [],
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          ease: "power2.out",
        },
        0.4
      )
      // Animate custom message section
      .to(
        customMessage,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0.5
      )
      // Animate footer
      .to(
        footer,
        {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        },
        0.6
      );
  };

  const closeChatWindow = (): void => {
    const chatWindow = chatWindowRef.current;
    const header = headerRef.current;
    const content = contentRef.current;
    const footer = footerRef.current;
    const backdrop = backdropRef.current;

    if (!chatWindow) return;

    // Kill any existing timeline
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create closing animation timeline
    const tl = gsap.timeline();
    timelineRef.current = tl;

    tl.to([header, content, footer], {
      y: -10,
      opacity: 0,
      duration: 0.2,
      stagger: 0.05,
      ease: "power2.in",
    })
      .to(
        backdrop,
        {
          opacity: 0,
          duration: 0.2,
        },
        0.1
      )
      .to(
        chatWindow,
        {
          scale: 0.8,
          opacity: 0,
          y: 30,
          duration: 0.3,
          ease: "back.in(1.7)",
        },
        0.2
      );
  };

  const toggleChat = (): void => {
    if (isOpen) {
      closeChatWindow();
      // Delay state change to allow animation to complete
      setTimeout(() => setIsOpen(false), 300);
    } else {
      setIsOpen(true);
      // Small delay to ensure DOM is rendered before animating
      setTimeout(() => openChatWindow(), 50);
    }
  };

  const openWhatsApp = (message: string = customMessage): void => {
    const cleanPhoneNumber = phoneNumber ? phoneNumber.replace(/\D/g, "") : "";

    if (!cleanPhoneNumber) {
      alert(
        "WhatsApp phone number is not configured. Please contact the administrator."
      );
      return;
    }

    const cleanMessage = message.trim();
    const encodedMessage = encodeURIComponent(cleanMessage);
    const whatsappUrl = `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;

    console.log("Opening WhatsApp with:", {
      phoneNumber: cleanPhoneNumber,
      message: cleanMessage,
      url: whatsappUrl,
    });

    try {
      const newWindow = window.open(
        whatsappUrl,
        "_blank",
        "noopener,noreferrer"
      );

      setTimeout(() => {
        if (newWindow && (newWindow.closed || !newWindow.location)) {
          console.warn(
            "Popup blocked. Please allow popups for this site or manually copy the WhatsApp link."
          );

          alert(
            "Please allow popups for this site to open WhatsApp, or copy this link: " +
              whatsappUrl
          );

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
      alert("Unable to open WhatsApp. Please try again or contact support.");
    }

    // Close chat with animation
    closeChatWindow();
    setTimeout(() => setIsOpen(false), 300);
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

  if (!phoneNumber) {
    console.warn("Phone number is not set");
    return null;
  }

  return (
    <>
      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          className={`fixed ${getChatWindowPosition()} w-80 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 max-h-96`}
          style={{ opacity: 0, transform: "scale(0.8) translateY(50px)" }}
        >
          {/* Header */}
          <div
            ref={headerRef}
            className={`${currentColorClasses.primary} text-white p-4 rounded-t-lg flex justify-between items-center`}
            style={{ opacity: 0, transform: "translateY(-20px)" }}
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
          <div
            ref={contentRef}
            className="p-4 space-y-4 flex-1 overflow-y-auto"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            {/* Welcome Message */}
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                👋 Hello! Ready to chat on WhatsApp?
              </p>
              {/* <p className="text-xs text-gray-500">{supportHours}</p> */}
            </div>

            {/* Quick Actions */}
            {showQuickActions && quickActions.length > 0 && (
              <div ref={quickActionsRef} className="space-y-2">
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
                    className={`w-full text-left p-2 rounded-lg ${currentColorClasses.secondary} hover:opacity-80 transition-all duration-200 text-sm cursor-pointer border border-transparent hover:border-gray-300 hover:scale-105 hover:shadow-md`}
                    style={{ opacity: 0, transform: "translateX(-30px)" }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            {/* Custom Message Input */}
            <div
              ref={customMessageRef}
              className="space-y-2"
              style={{ opacity: 0, transform: "translateY(20px)" }}
            >
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
                className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 ${currentColorClasses.ring} focus:border-transparent resize-none transition-all duration-200 focus:scale-105`}
                rows={3}
                aria-label="Custom message"
              />
            </div>
          </div>

          {/* Footer */}
          <div
            ref={footerRef}
            className="p-4 border-t border-gray-200"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSendCustomMessage();
              }}
              className={`w-full ${currentColorClasses.button} text-white py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer hover:scale-105 hover:shadow-lg`}
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
        } text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl z-50 flex items-center justify-center group`}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        {isOpen ? (
          <X
            size={24}
            className="transition-transform duration-300 group-hover:rotate-90"
          />
        ) : (
          <MessageCircle
            size={24}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {/* Notification dot */}
        {!isOpen && showNotificationBadge && notificationCount > 0 && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
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
          ref={backdropRef}
          className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
          onClick={toggleChat}
          aria-hidden="true"
          style={{ opacity: 0 }}
        />
      )}
    </>
  );
};

export type { WhatsAppChatButtonProps };
export default WhatsAppChatButton;
