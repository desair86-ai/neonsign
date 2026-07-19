import Link from "next/link";
import { LayoutDashboard, Palette, FileText, Settings, LogOut, Image as ImageIcon } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 border-r border-gray-800">
        <div className="p-6">
          <h2 className="text-xl font-bold bg-gradient-to-r from-brand-purple to-brand-green bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>
        <nav className="px-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link href="/admin/theme" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Palette size={20} />
            Theme Settings
          </Link>
          <Link href="/admin/pages" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <FileText size={20} />
            Static Pages
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Settings size={20} />
            Settings
          </Link>
          <Link href="/admin/settings/backgrounds" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <ImageIcon size={20} />
            Neon Backgrounds
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-800">
          <Link href="/api/auth/signout" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors">
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-black p-8 text-white">
        {children}
      </main>
    </div>
  );
}
