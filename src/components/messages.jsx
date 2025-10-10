import React, { useState, useEffect, useRef } from 'react';
;
}

export function Messages({ initialData }) {
  const { user, accessToken } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (user) {
      loadConversations();
      
      // Auto-select conversation if initial data provided
      if (initialData) {
        const convId = [user?.id, initialData.recipientId].sort().join(':');
        setSelectedConversation(convId);
        loadMessages(initialData.recipientId);
      }
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      setLoading(true);
      const data = await apiRequest('/conversations', {}, accessToken || undefined);
      setConversations(data || []);
    } catch (error) {
      console.error('Failed to load conversations:', error);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMessages = async (otherUserId) => {
    try {
      const data = await apiRequest(`/messages/${otherUserId}`, {}, accessToken || undefined);
      setMessages(data || []);
    } catch (error) {
      console.error('Failed to load messages:', error);
      setMessages([]);
    }
  };

  const handleSelectConversation = (conv) => {
    setSelectedConversation(conv.conversationId);
    loadMessages(conv.otherUserId);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const otherUserId = selectedConversation?.split(':').find(id => id !== user?.id);
    if (!otherUserId) return;

    try {
      await apiRequest('/messages', {
        method: 'POST',
        body: JSON.stringify({
          recipientId,
          content,
          productId: initialData?.productId,
        }),
      }, accessToken || undefined);

      setNewMessage('');
      await loadMessages(otherUserId);
      await loadConversations();
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message');
    }
  };

  const selectedConvData = conversations.find(c => c.conversationId === selectedConversation);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl mb-2">Messages</h1>
        <p className="text-gray-600">Chat with buyers and sellers</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          
            <CardTitle className="text-lg">Conversations</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-350px)]">
              {loading ? (
                <div className="p-4 text-center text-gray-600">Loading...</div>
              ) : conversations.length === 0 ? (
                <div className="p-4 text-center text-gray-600">
                  <MessageSquare className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  No conversations yet</p>
                  <p className="text-sm mt-1">Start chatting with stores or customers!</p>
                </div>
              ) : (
                <div className="divide-y">
                  {conversations.map(conv => (
                    <button
                      key={conv.conversationId}
                      onClick={() => handleSelectConversation(conv)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        selectedConversation === conv.conversationId ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="truncate">{conv.otherUserName}</span>
                        {conv.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage.content}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(conv.lastMessage.createdAt).toLocaleDateString()}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Messages Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b">
                <CardTitle className="text-lg">
                  {selectedConvData?.otherUserName || 'Chat'}
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Discuss product details and finalize your deal
                </p>
              </CardHeader>
              <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            msg.senderId === user?.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {msg.content}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.senderId === user?.id ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {new Date(msg.createdAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="mt-6 bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm text-gray-700">
            💬 Chat Guidelines:</strong> Keep all conversations professional and business-focused. 
            Discuss product details, pricing, and shipping. Report any suspicious activity to maintain a safe marketplace.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
