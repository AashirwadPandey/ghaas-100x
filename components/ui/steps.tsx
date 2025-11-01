import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepProps {
  title: string;
  description: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

export function Step({ title, description, isCompleted, isActive }: StepProps) {
  return (
    <div className={cn(
      "flex gap-4",
      isActive && "text-primary",
      isCompleted && "text-muted-foreground"
    )}>
      <div className="relative flex flex-col items-center">
        <div className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full border-2",
          isCompleted && "border-primary bg-primary text-primary-foreground",
          isActive && "border-primary",
          !isCompleted && !isActive && "border-muted"
        )}>
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5" />
          ) : (
            <span className="text-sm font-medium"></span>
          )}
        </div>
        <div className="absolute top-8 h-full w-px bg-border" />
      </div>
      <div className="flex-1 pb-8 pt-1">
        <h4 className="text-base font-medium">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}