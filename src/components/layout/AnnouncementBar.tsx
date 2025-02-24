// components/layout/AnnouncementBar.tsx
export function AnnouncementBar() {
  return (
    <div className="w-full bg-primary/10 text-primary px-4 py-2 text-sm text-center">
      <div className="flex items-center justify-center gap-2">
        <span>⚡</span>
        This site is under development and will officially launch on February 23rd at 21:45 UTC at
        Epoch 542.
      </div>
    </div>
  );
}
