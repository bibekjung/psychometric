import * as React from 'react';
import { cn } from '@/lib/utils';

interface DropdownMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export function DropdownMenu({
  children,
  trigger,
  align = 'right',
}: DropdownMenuProps) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const alignClasses = {
    left: 'left-0',
    right: 'right-0',
    center: 'left-1/2 -translate-x-1/2',
  };

  const closeMenu = () => setOpen(false);

  return (
    <div className="relative inline-block" ref={menuRef}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={cn(
            'absolute z-50 mt-1 min-w-[160px] rounded-md border bg-white shadow-lg',
            alignClasses[align],
          )}
        >
          <div className="py-1">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child, { onClose: closeMenu } as any);
              }
              return child;
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface DropdownMenuItemProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'default' | 'destructive';
  onClose?: () => void;
}

export function DropdownMenuItem({
  children,
  onClick,
  className,
  variant = 'default',
  onClose,
}: DropdownMenuItemProps) {
  const baseClasses =
    'flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors w-full';
  const variantClasses = {
    default: 'text-gray-700 hover:bg-gray-100',
    destructive: 'text-red-600 hover:bg-red-50',
  };

  const handleClick = () => {
    onClick?.();
    onClose?.();
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}
