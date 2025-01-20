import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Send, Image, CreditCard } from "lucide-react";

interface Message {
  sender: string;
  recipient: string;
  content: string;
  messageType: "text" | "image" | "eth";
  timestamp: number;
  ethAmount: number;
  imageHash: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !recipientAddress) {
      toast({
        title: "Error",
        description: "Please enter a message and recipient address",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement web3 connection and contract interaction
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully",
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-1/4 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">DeChat</h2>
        </div>
        <div className="p-4">
          <Input
            placeholder="Enter recipient address"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
            className="mb-2"
          />
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
          <div className="flex items-center">
            <Avatar className="h-10 w-10" />
            <div className="ml-4">
              <p className="font-medium">{recipientAddress || "Select Recipient"}</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-emerald-500 text-white"
                      : "bg-white dark:bg-gray-800"
                  }`}
                >
                  {message.messageType === "image" && (
                    <img
                      src={`https://gateway.pinata.cloud/ipfs/${message.imageHash}`}
                      alt="Message"
                      className="rounded-lg mb-2"
                    />
                  )}
                  <p>{message.content}</p>
                  {message.messageType === "eth" && (
                    <p className="text-sm opacity-75">
                      Sent {message.ethAmount} ETH
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Image className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <CreditCard className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;