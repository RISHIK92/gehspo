"use client";

export default function AboutUs() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-emerald-400 drop-shadow-lg">
        Founder & Chief Coordinator of <span className="text-white">WWW.GEHSPO.COM</span>
      </h1>

      {/* Education Background */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-3">Education Background</h2>
        <p className="text-lg leading-relaxed">
          Mr. Ghanta Bharat has done Graduation in Physics, pursued P.G. Diploma in Industrial Safety, NEBOSH-IGC, IOSH-MS, ISO 45001:2018 Lead Auditor, IMS, EMS, Certified Negotiation Manager, Certified Basic Management Essentials Professional.
        </p>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-emerald-300 mb-3">Experience</h2>
        <p className="text-lg leading-relaxed">
          Mr. Ghanta Bharat is having 15 years of experience in total, with 13 years in EHS across construction, O&M, and manufacturing industries. He has worked in many reputed companies such as ABB India Ltd, Wartsila India PVT Ltd, Renewsys India PVT Ltd, Feedback Power India PVT Ltd, Sairam Engineering Services India PVT Ltd, PACE Process & Controls India PVT Ltd, and PSV PVT Ltd.
        </p>
      </section>

      {/* Background in developing GEHSPO */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-300 mb-3">Background in Developing GEHSPO</h2>
        <p className="text-lg leading-relaxed">
          Implementing and maintaining EHS is found very difficult due to many reasons such as frequent changes in standards and laws, management not knowing the benefits of EHS, employers and employees lacking required knowledge, neglecting EHS for the sake of targets by middle management, governing bodies not working up to standards, and workforce not having sufficient EHS knowledge. <br /><br />
          <span className="font-semibold text-emerald-200">WWW.GEHSPO.COM</span> is formed to enhance the EHS profession by providing knowledge to EHS professionals, irrespective of experience, to implement EHS in their respective industries.
        </p>
      </section>
    </div>
  );
}
