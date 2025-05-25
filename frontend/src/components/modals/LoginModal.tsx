'use client'
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import LoginForm from '../auth/LoginForm';

export default function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      <div className="bg-emerald-900 p-6 rounded-xl z-50 max-w-md w-full relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-white cursor-pointer hover:text-zinc-400">
          <X />
        </button>
        <LoginForm/>
      </div>
    </Dialog>
  );
}
