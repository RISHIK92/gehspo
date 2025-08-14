"use client";

export default function AboutUs() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-100">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-400 drop-shadow-lg">
        Founder & Chief Coordinator of{" "}
        <span className="text-white">WWW.GEHSPO.COM</span>
      </h1>

      {/* Education Background */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-300 mb-3">
          Education Background
        </h2>
        <p className="text-lg leading-relaxed">
          Mr. Ghanta Bharat has done Graduation in Physics.
        </p>
      </section>

      {/* Trainings and Certifications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-300 mb-3">
          Trainings & Certifications
        </h2>
        <ul className="list-disc list-inside text-lg leading-relaxed space-y-1">
          <li>
            NEBOSH Passport Training in Chemical Safety from St. John Health &
            Safety
          </li>
          <li>P.G. Diploma in Industrial Safety from SBTET</li>
          <li>NEBOSH-IGC from NEBOSH Board - U.K.</li>
          <li>
            Accredited by ROSPA What Everyone Needs to Know About Permit to Work
          </li>
          <li>IOSH MS from IOSH Board - U.K.</li>
          <li>
            CPD Certified HAZWOPERM: Hazardous Waste Operations and Emergency
            Response Management
          </li>
          <li>
            IRCA Approved OHSMS ISO 45001:2018 Lead Auditor from TUV - Germany
          </li>
          <li>CPD Certified MOC: Management of Change in Process Safety</li>
          <li>
            IRCA Approved EMS ISO 14001:2015 Lead Auditor from TUV - Germany
          </li>
          <li>
            EFSP- (Essentials of Fire Safety Principles) from Dubai KHDA - UAE
          </li>
          <li>
            CPD Certified IMS ISO 9001:2015, ISO 14001:2015 & OHSAS 18001:20117
            Internal Auditor
          </li>
          <li>FAW- (First Aid at Work) from Dubai KHDA - UAE</li>
          <li>NEBOSH-PSM</li>
          <li>
            NCFE Certified LEVEL - 3 Award in Health and Safety for the
            workplace from UK
          </li>
          <li>NEBOSH-HAZOP</li>
          <li>Qualified First-Aider from St John's Ambulance</li>
          <li>Lean Six Sigma Black Belt</li>
        </ul>
      </section>

      {/* Experience */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-blue-300 mb-3">
          Experience
        </h2>
        <p className="text-lg leading-relaxed">
          Mr. Ghanta Bharat is having 23 years of experience in EHS Domain,
          including Construction in Green Field Projects & Running Projects, O&M
          of Thermal Power Plants, Manufacturing of Solar Modules, Steel
          Fabrication Industry, Chemical Industry, and Pharma Industry.
          <br />
          <br />
          He has worked in many reputed companies such as:
          <ul className="list-disc list-inside ml-4 mt-2">
            <li>Fleming Laboratories Pvt Ltd</li>
            <li>Bhagiradha Chemicals & Industries Limited</li>
            <li>EnerTap Pvt Ltd</li>
            <li>ABB India Ltd</li>
            <li>Wartsila India PVT Ltd</li>
            <li>Renewsys India PVT Ltd</li>
            <li>Feedback Power India PVT Ltd</li>
            <li>Pennar Industries Ltd</li>
            <li>Sairam Engineering services India PVT Ltd</li>
            <li>PACE Process & Controls India PVT Ltd</li>
            <li>PSV PVT Ltd</li>
          </ul>
        </p>
      </section>

      {/* Background in developing GEHSPO */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-300 mb-3">
          Background in Developing GEHSPO
        </h2>
        <p className="text-lg leading-relaxed">
          Implementing and maintaining EHS is found very difficult due to many
          reasons such as frequent changes in standards and laws, management not
          knowing the benefits of EHS, employers and employees lacking required
          knowledge, neglecting EHS for the sake of targets by middle
          management, governing bodies not working up to standards, and
          workforce not having sufficient EHS knowledge. <br />
          <br />
          <span className="font-semibold text-blue-200">WWW.GEHSPO.COM</span> is
          formed to enhance the EHS profession by providing knowledge to EHS
          professionals, irrespective of experience, to implement EHS in their
          respective industries.
        </p>
      </section>
    </div>
  );
}
