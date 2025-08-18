import Account from "@/components/account-settings/Account";

export default function page() {
  return (
    <main className="max-w-7xl mx-auto px-6 pt-20 my-10 bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 min-h-full relative overflow-hidden">
      <div className=""></div>
      <div className="  left-0    to-indigo-500 absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10  rounded-full -translate-y-16 translate-x-16"></div>
      <Account />
    </main>
  );
}
