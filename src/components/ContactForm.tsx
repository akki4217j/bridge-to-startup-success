
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

interface ContactFormProps {
  recipientName: string;
  recipientType?: "business" | "need";
}

const ContactForm = ({ recipientName, recipientType = "business" }: ContactFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate sending a message
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Message Sent",
        description: `Your message to ${recipientName} has been sent successfully!`,
      });
      setSubject("");
      setMessage("");
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <p className="text-blue-700 text-sm">
          <strong>Privacy Note:</strong> Your contact details will remain hidden. 
          Messages go directly to the {recipientType} owner.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          placeholder="Enter message subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Your message</Label>
        <Textarea
          id="message"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          required
        />
      </div>

      <Button 
        type="submit" 
        className="w-full bg-startupBlue-600 hover:bg-startupBlue-700"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default ContactForm;
