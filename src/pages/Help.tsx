import { MobileLayout } from "@/components/MobileLayout";
import { AppHeader } from "@/components/AppHeader";
import { ChevronDown, MessageCircle, Send, X } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q: "How do I add a new expense?", a: "Go to the Home tab and tap the big + button at the bottom center of the screen." },
  { q: "Can I change my currency?", a: "Yes, go to Settings > General > Currency and select your preferred currency." },
  { q: "How are budgets calculated?", a: "Budgets are calculated per category on a monthly basis. You can set them up in the Budgets tab." },
  { q: "Can I delete an expense after adding it?", a: "Yes, open the expense details and tap the delete icon to remove it from your records." }
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ sender: "bot", text: "Hi! How can we help you today?" }]);
  const [input, setInput] = useState("");

  const sendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    const currentInput = input;
    setInput("");
    
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: "Thank you for reaching out! A support representative will get back to you shortly regarding your query." }]);
    }, 1000);
  };

  return (
    <MobileLayout>
      <AppHeader title="Help & Support" showBack={true} />
      <div className="px-5 pb-6 space-y-6 pt-4">
        
        {isChatOpen ? (
          <div className="bg-card border border-border/40 rounded-2xl overflow-hidden flex flex-col h-[400px]">
            <div className="bg-primary/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <MessageCircle size={16} />
                </div>
                <h3 className="font-bold text-sm">Live Support</h3>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user" ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-secondary rounded-tl-sm"}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            
            <form onSubmit={sendMessage} className="p-3 border-t border-border/40 flex items-center gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..." 
                className="flex-1 bg-secondary/50 border-0 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
              <button type="submit" disabled={!input.trim()} className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground disabled:opacity-50">
                <Send size={16} className="ml-1" />
              </button>
            </form>
          </div>
        ) : (
          <>
            <div 
              onClick={() => setIsChatOpen(true)}
              className="bg-primary/10 rounded-2xl p-5 flex items-center gap-4 cursor-pointer hover:bg-primary/15 transition-colors"
            >
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold">Chat with us</h3>
                <p className="text-sm text-muted-foreground">Typically replies in 5 minutes</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-lg">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-card border border-border/40 rounded-2xl overflow-hidden">
                    <button 
                      className="w-full flex items-center justify-between p-4 text-left font-medium"
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
                    </button>
                    {openIndex === i && (
                      <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border/40 mt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </MobileLayout>
  );
}
