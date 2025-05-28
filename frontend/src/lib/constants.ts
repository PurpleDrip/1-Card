import type { UserProfile, DocumentInfo, ActivityItem } from '@/types';
import { Fingerprint, CreditCard, BookUser, Archive, History, CheckCircle2, FilePlus2, UserCircle2, AlertTriangle, ShieldCheck, DownloadCloud, TrendingUp, FileText, Library, LucideIcon } from 'lucide-react';

export const MOCK_USER_PROFILE: UserProfile = {
  name: 'Alex Johnson',
  ocId: 'OCID-A1B2C3D4E5F6',
  avatarUrl: 'https://picsum.photos/100/100',
  email: 'alex.johnson@example.com',
};

export const INITIAL_DOCUMENTS: DocumentInfo[] = [
  { id: '1', name: 'Aadhar Card', type: 'Aadhar', status: 'verified', icon: Fingerprint, issueDate: '2015-08-20' },
  { id: '2', name: 'PAN Card', type: 'Pancard', status: 'verified', icon: CreditCard, issueDate: '2016-03-10' },
  { id: '3', name: 'Passport', type: 'Passport', status: 'not_uploaded', icon: BookUser },
  { id: '4', name: 'Ration Card', type: 'Ration', status: 'not_uploaded', icon: Archive },
  { id: '5', name: 'Driving License', type: 'Driving License', status: 'pending', icon: FileText, issueDate: '2023-11-01' },
  { id: '6', name: 'USN Card', type: 'USN', status: 'rejected', icon: Library, issueDate: '2020-07-15' },
];

export const MOCK_ACTIVITIES: ActivityItem[] = [
  { id: 'act1', description: 'Aadhar Card verified successfully.', timestamp: '2 days ago', icon: CheckCircle2 },
  { id: 'act2', description: 'New login from Chrome on Windows.', timestamp: '1 day ago', icon: History },
  { id: 'act3', description: 'PAN Card uploaded.', timestamp: '3 days ago', icon: FilePlus2 },
  { id: 'act4', description: 'Driving License verification pending.', timestamp: '1 hour ago', icon: AlertTriangle },
  { id: 'act5', description: 'Profile information updated.', timestamp: '5 days ago', icon: UserCircle2 },
];

export const MOCK_VERIFICATION_COUNT = 72;

export const DOCUMENT_TYPES: { label: string; value: DocumentInfo['type']; icon: LucideIcon }[] = [
    { label: 'Aadhar Card', value: 'Aadhar', icon: Fingerprint },
    { label: 'PAN Card', value: 'Pancard', icon: CreditCard },
    { label: 'Passport', value: 'Passport', icon: BookUser },
    { label: 'Ration Card', value: 'Ration', icon: Archive },
    { label: 'Driving License', value: 'Driving License', icon: FileText },
    { label: 'USN Card', value: 'USN', icon: Library },
    { label: 'Other Document', value: 'Other', icon: FileText },
];

export const ONE_CARD_EXTENSION_LINK = "https://chrome.google.com/webstore"; // Placeholder link

export const DASHBOARD_STATS = [
    { id: 'docs_verified', title: 'Documents Verified', value: INITIAL_DOCUMENTS.filter(doc => doc.status === 'verified').length, icon: ShieldCheck, trend: '+2 this month' },
    { id: 'verifications_done', title: 'Total Verifications', value: MOCK_VERIFICATION_COUNT, icon: TrendingUp, trend: '+10 this month'  },
    { id: 'docs_pending', title: 'Documents Pending', value: INITIAL_DOCUMENTS.filter(doc => doc.status === 'pending').length, icon: AlertTriangle, trend: 'Action required'  },
];
