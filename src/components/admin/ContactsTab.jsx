import { useQuery } from "@tanstack/react-query";
import { Mail, Phone, MapPin, Calendar, ExternalLink } from "lucide-react";
import { fetchContactRequests } from "@/integrations/firebase/queries";
import { formatDistanceToNow } from "date-fns";

export default function ContactsTab() {
  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contact_requests"],
    queryFn: fetchContactRequests,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contact Requests</h2>
        <p className="text-muted-foreground mt-1">
          {contacts.length} {contacts.length === 1 ? "message" : "messages"} received
        </p>
      </div>

      {contacts.length === 0 ? (
        <div className="p-8 text-center border border-border rounded-lg bg-card">
          <Mail className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No contact requests yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="p-4 border border-border rounded-lg bg-card hover:border-primary/50 transition-colors space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {contact.subject && `Subject: ${contact.subject}`}
                  </p>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  contact.is_read
                    ? "bg-muted text-muted-foreground"
                    : "bg-primary/10 text-primary"
                }`}>
                  {contact.is_read ? "Read" : "New"}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-primary hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>
                {contact.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-primary hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>

              <div className="bg-background rounded p-3 border border-border">
                <p className="text-sm">{contact.message}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {contact.service_interest && (
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    Interested in: {contact.service_interest}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDistanceToNow(new Date(contact.submitted_at), { addSuffix: true })}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <a
                  href={`mailto:${contact.email}?subject=Re: ${contact.subject || "Your inquiry"}`}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  Reply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
