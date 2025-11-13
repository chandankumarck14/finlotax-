import { Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-10 h-[73px] bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <button className="lg:hidden">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
        
        <div className="flex items-center gap-3">
          <Avatar className="w-9 h-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-sm">CK</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-foreground hidden sm:block">Chandan Kumar</span>
        </div>
      </div>
    </header>
  );
};
