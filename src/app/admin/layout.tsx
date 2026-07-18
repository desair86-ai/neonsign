import Link from "next/link";
import { Palette, FileText, Settings, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-950 text-white font-inter">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800 p-6 flex flex-col">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-purple flex items-center justify-center">
            <LayoutDashboard size={18} className="text-white" />
          </div>
          <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-green to-brand-purple">
            Admin Panel
          </h1>
        </div>

        <nav className="flex-1 space-y-2">
          <Link
            href="/admin/theme"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-gray-300 hover:text-brand-green"
          >
            <Palette size={20} />
            <span>Theme Settings</span>
          </Link>
          
          <Link
            href="/admin/pages"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-gray-300 hover:text-brand-purple"
          >
            <FileText size={20} />
            <span>Static Pages</span>
          </Link>
          
          <div className="mt-8 pt-8 border-t border-gray-800">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
            >
              <Settings size={20} />
              <span>Back to Site</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
