import { useState } from "react";
import { messages as initialMessages, users } from "@/data/mockData";
import { Message, MessageType, MessageStatus } from "@/types";
import ChatInterface from "@/components/messages/ChatInterface";
import { Card } from "@/components/ui/card";

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const currentUser = users[0]; // Using the admin user for demo
  
  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      senderId: currentUser.id,
      chatRoomId: 1,
      content,
      messageType: MessageType.CHAT,
      status: MessageStatus.SENT,
      createdAt: new Date()
    };
    
    setMessages([...messages, newMessage]);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
        <p className="text-muted-foreground">
          Communicate with tenants and team members
        </p>
      </div>
      
      <Card className="h-[calc(100vh-240px)]">
        <ChatInterface 
          messages={messages}
          users={users}
          currentUser={currentUser}
          onSendMessage={handleSendMessage}
        />
      </Card>
    </div>
  );
};

export default Messages;