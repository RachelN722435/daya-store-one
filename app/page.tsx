"use client"
export default function DayaHome() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-black">
      <header className="flex justify-between p-6 text-xs tracking-widest">
        <span className="font-bold">DAYA STYLE</span>
        <span>LAGOS - EST 2025</span>
      </header>

      <div className="grid md:grid-cols-3 gap-4 px-6">
        <div className="relative rounded-2xl overflow-hidden h-[500px]">
          <img src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600" className="w-full h-full object-cover" />
          <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs">EVENING GOWNS</span>
        </div>
        <div className="relative rounded-2xl overflow-hidden h-[500px]">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600" className="w-full h-full object-cover" />
          <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs">BEACHWEAR</span>
        </div>
        <div className="relative rounded-2xl overflow-hidden h-[500px]">
          <img src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600" className="w-full h-full object-cover" />
          <span className="absolute bottom-4 left-4 bg-white px-3 py-1 rounded-full text-xs">PARTY READY</span>
        </div>
      </div>

      <div className="px-6 py-16 max-w-4xl">
        <h1 className="text-5xl font-serif leading-tight">Every body is <br/><i className="font-light">Daya body.</i></h1>
        <p className="mt-4 text-sm text-gray-600 max-w-md">Gowns, beachwear, date looks, modest dresses, tailoring and more. We style every woman, every shape, every size.</p>
        <a href="/calculator" className="inline-block mt-8 bg-black text-white px-8 py-4 rounded-full text-sm">Find My Daya Fit →</a>
      </div>
    </div>
  )
}
