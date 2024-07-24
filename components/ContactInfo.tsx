
// app/components/ContactInfo.tsx

export function ContactInfo({ icon, title, content }: { icon: any, title: any, content: any }) {
    return (
      <div className="flex items-start">
        <div className="mr-4 mt-1">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-muted-foreground">{content}</p>
        </div>
      </div>
    );
  }
  