import type { LucideIcon } from 'lucide-react';

export type DocumentStatus = 'verified' | 'pending' | 'rejected' | 'not_uploaded';

export interface DocumentInfo {
  id: string;
  name: string;
  type: 'Aadhar' | 'Pancard' | 'Passport' | 'Ration' | 'Driving License' | 'USN' | 'Other';
  status: DocumentStatus;
  icon: LucideIcon;
  file?: File | null;
  issueDate?: string;
  expiryDate?: string;
}

export interface ActivityItem {
  id: string;
  description: string;
  timestamp: string; 
  icon: LucideIcon;
}

export interface UserProfile {
  name: string;
  ocId: string;
  avatarUrl: string;
  email: string;
}
