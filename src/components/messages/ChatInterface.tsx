import { useState, useRef, useEffect } from "react";
import { Message, User, MessageType, MessageStatus } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { formatTime } from "@/lib/formatters";

interface ChatInterfaceProps {
  messages: Message[];
  users: User[];
  currentUser: User;
  onSendMessage: (content: string) => void;
}

const ChatInterface = ({ messages, users, currentUser, onSendMessage }: ChatInterfaceProps) => {
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const sender = getUserById(message.senderId);
          const isCurrentUser = message.senderId === currentUser.id;
          
          return (
            <div 
              key={message.id} 
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={sender?.avatarUrl} />
                  <AvatarFallback>
                    {sender?.firstName?.[0]}{sender?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <div className={`flex items-center gap-2 ${isCurrentUser ? 'justify-end' : ''}`}>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.createdAt)}
                    </span>
                    <span className="text-sm font-medium">
                      {sender?.firstName} {sender?.lastName}
                    </span>
                  </div>
                  
                  <div 
                    className={`mt-1 p-3 rounded-lg ${
                      isCurrentUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;