export default function SettingsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold font-pacifico text-brand-green">Settings</h1>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold mb-4">General Settings</h2>
        <p className="text-gray-400 mb-8">Configure your site's metadata, social links, and other global settings here.</p>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Site Name</label>
            <input 
              type="text" 
              value="Neon Stack"
              disabled
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none opacity-50 cursor-not-allowed"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-400">Support Email</label>
            <input 
              type="email" 
              value="support@neonstack.com"
              disabled
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white outline-none opacity-50 cursor-not-allowed"
            />
          </div>
          
          <p className="text-sm text-yellow-500 italic mt-4">* More settings coming soon.</p>
        </div>
      </div>
    </div>
  );
}
