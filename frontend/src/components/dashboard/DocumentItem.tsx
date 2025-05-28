import type { DocumentInfo } from '@/types';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertCircle, XCircle, Clock } from 'lucide-react';

interface DocumentItemProps {
  document: DocumentInfo;
}

const statusStyles: Record<DocumentInfo['status'], string> = {
  verified: 'bg-green-100 text-green-700 border-green-300',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  rejected: 'bg-red-100 text-red-700 border-red-300',
  not_uploaded: 'bg-gray-100 text-gray-700 border-gray-300',
};

const statusIcons: Record<DocumentInfo['status'], React.ElementType> = {
    verified: CheckCircle2,
    pending: Clock,
    rejected: XCircle,
    not_uploaded: AlertCircle,
};


export function DocumentItem({ document }: DocumentItemProps) {
  const Icon = document.icon;
  const StatusIcon = statusIcons[document.status];

  return (
    <div className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-md transition-colors">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-primary" />
        <div>
          <p className="font-medium">{document.name}</p>
          {document.issueDate && <p className="text-xs text-muted-foreground">Issued: {document.issueDate}</p>}
        </div>
      </div>
      <Badge variant="outline" className={cn("capitalize text-xs", statusStyles[document.status])}>
        <StatusIcon className="mr-1 h-3 w-3" />
        {document.status.replace('_', ' ')}
      </Badge>
    </div>
  );
}
