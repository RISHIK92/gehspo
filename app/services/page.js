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
            Maha Lakshmi Consultancy
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

      {/* Services List */}
      <section className="max-w-3xl mx-auto px-4 pb-12">
        <ul className="space-y-6 text-lg">
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">1.</span>
            Certification of companies related to <span className="font-semibold text-emerald-300">ISO OHSMS, ISO EMS, ISO QMS & IMS</span>
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">2.</span>
            Internal Audits in organizations related to <span className="font-semibold text-emerald-300">QEHS</span>
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">3.</span>
            Preparing <span className="font-semibold text-emerald-300">ERP (Emergency Response Plan)</span> & conducting mock drills as per EHS standards
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">4.</span>
            Documentation preparation support related to <span className="font-semibold text-emerald-300">EHS</span>
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">5.</span>
            Fire equipment installations and fire license as per government norms
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">6.</span>
            PPE's supply related to any industry
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">7.</span>
            Trainings related to <span className="font-semibold text-emerald-300">EHS</span> (Online & Classroom)
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">8.</span>
            Preparing <span className="font-semibold text-emerald-300">EHS Training Modules</span>
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">9.</span>
            Preparing procedures related to <span className="font-semibold text-emerald-300">EHS</span>
          </li>
          <li className="bg-gray-900 bg-opacity-80 border border-gray-700 rounded-lg p-5 shadow hover:shadow-lg transition-all">
            <span className="font-bold text-emerald-400 mr-2">10.</span>
            Supporting in investigations related to any type of incidents
          </li>
        </ul>
      </section>

      {/* Chief Consultant Card */}
      <section className="max-w-2xl mx-auto px-4 pb-20">
        <div className="bg-gray-900 bg-opacity-90 border border-emerald-700 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <img
              src="https://static.wixstatic.com/media/8fafd4_e3c0c3a1726b4dcda553475a4ab25c38~mv2_d_1424_2144_s_2.jpg/v1/fill/w_166,h_238,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/DSC_0326_JPG.jpg"
              alt="Chief Consultant"
              className="w-28 h-28 rounded-full object-cover border-4 border-emerald-500 shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-emerald-400 mb-2">Chief Operations Officer</h2>
            <div className="text-lg font-semibold text-gray-100 mb-1">Ghanta Bharat</div>
            <div className="text-gray-300 mb-2">
              <span className="font-medium">Mobile:</span> +91 99498 45759, +91 77269 32023
            </div>
            <div className="text-gray-300 mb-2">
              <span className="font-medium">Email:</span> <a href="mailto:bharat.ghanta@Gmail.com" className="text-emerald-300 hover:underline">bharat.ghanta@Gmail.com</a>; <a href="mailto:ghantabharat@yahoo.com" className="text-emerald-300 hover:underline">ghantabharat@yahoo.com</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
