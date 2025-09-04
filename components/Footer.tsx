export default function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} WeebFlix. All rights reserved.</p>
        <p className="opacity-80">Built with NextJs + Tailwind</p>
      </div>
    </footer>
  );
}