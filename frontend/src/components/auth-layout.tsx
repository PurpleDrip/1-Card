import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
}

export function AuthLayout({ children, title, description }: AuthLayoutProps) {
  return (
    <div className="flex max-h-min flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md shadow-xl">
        <div className="flex flex-col items-center sm:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-roboto font-bold tracking-tight text-emerald-600">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground my-2">{description}</p>
            )}
          </div>
          {children}
        </div>
      </Card>
    </div>
  );
}
