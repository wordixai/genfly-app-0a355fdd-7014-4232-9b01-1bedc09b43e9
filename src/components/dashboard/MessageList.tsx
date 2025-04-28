import { Message, User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatTime } from "@/lib/formatters";

interface MessageListProps {
  messages: Message[];
  users: User[];
}

const MessageList = ({ messages, users }: MessageListProps) => {
  const getUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => {
            const sender = getUserById(message.senderId);
            
            return (
              <div key={message.id} className="flex gap-3">
                <Avatar>
                  <AvatarImage src={sender?.avatarUrl} />
                  <AvatarFallback>
                    {sender?.firstName?.[0]}{sender?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {sender?.firstName} {sender?.lastName}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {message.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageList;