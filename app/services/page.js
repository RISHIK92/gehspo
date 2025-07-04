"use client";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-gray-950 text-white">
      {/* Top Image and Heading */}
      <div className="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Services Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide drop-shadow-lg mb-2">SERVICES</h1>
          <p className="text-lg md:text-2xl text-gray-200 font-medium drop-shadow-md">
            MLC
          </p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      {/* Logo below Banner */}
      <div className="flex justify-center mt-8 mb-4">
        <img
          src="https://static.wixstatic.com/media/8fafd4_1c5f97cd4e2a49a7a4b3c10b98ec2c10~mv2.jpg/v1/fill/w_648,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/FullColor_1024x1024_300dpi.jpg"
          alt="Maha Lakshmi Consultancy Logo"
          className="w-32 h-32 md:w-44 md:h-44 shadow-2xl border-4 border-white/20 bg-white/10 object-contain"
        />
      </div>

      {/* Intro */}
      <section className="max-w-3xl mx-auto px-4 py-10 text-center">
        <p className="text-xl text-gray-300 mb-8">
          We provide the following services to help your organization achieve excellence in EHS, quality, and compliance:
        </p>
      </section>

      {/* Services PDF Section */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg shadow-xl p-4">
          <iframe
            src="https://drive.google.com/file/d/1-AMGW6BxAGDTc0mFX1WgcoogHKXVWLBL/preview"
            title="Services PDF"
            width="100%"
            height="700"
            className="w-full rounded-lg"
            style={{ minHeight: 500, border: "none" }}
            allow="autoplay"
          />
        </div>
      </section>

      {/* Chief Consultant Card */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-gray-900 bg-opacity-90 border border-emerald-700 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/df622sxkk/image/upload/v1751639197/IMG-20250702-WA0027_huukeh.jpg"
              alt="Chief Consultant"
              className="w-30 h-34 object-cover border-4 border-emerald-500 shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Chief Operations Officer</h2>
            <div className="text-lg font-semibold text-gray-100 mb-1">Ghanta Bharat</div>
            <div className="text-gray-300 mb-2">
              <span className="font-medium">Mobile:</span> +91 99498 45759, +91 77269 32023
            </div>
            <div className="text-gray-300 mb-2">
              <span className="font-medium">Email:</span> <a href="mailto:bharat.ghanta@Gmail.com" className="text-emerald-300 hover:underline">bharat.ghanta@gmail.com</a>; <a href="mailto:ghantabharat@yahoo.com" className="text-emerald-300 hover:underline">ghantabharat@yahoo.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
