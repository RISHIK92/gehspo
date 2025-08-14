"use client";

export default function AboutUs() {
  const companyLogos = [
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157593/IMG-20250814-WA0022_qehvta.jpg",
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157595/IMG-20250814-WA0018_k78hjj.jpg",
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157590/IMG-20250814-WA0023_ffxqgw.jpg",
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157589/IMG-20250814-WA0019_fcwhtv.jpg",
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157586/IMG-20250814-WA0021_w6xlws.jpg",
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157583/IMG-20250814-WA0016_s0v24o.jpg",
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157580/IMG-20250814-WA0020_aynpwx.jpg",
    "https://res.cloudinary.com/df622sxkk/image/upload/v1755157578/IMG-20250814-WA0017_ocoq7v.jpg",
  ];

  const duplicatedLogos = [...companyLogos, ...companyLogos];
  const headerProfilePicUrl =
    "https://res.cloudinary.com/df622sxkk/image/upload/v1751639197/IMG-20250702-WA0027_huukeh.jpg";

  return (
    <>
      <section className="py-16 md:py-24 px-4 text-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 mb-4 leading-tight drop-shadow-lg">
              About Us
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-blue-300 mb-4">
              Virtual Assistant at your Service,
              <br />
              All QEHS services at one place
            </p>
            <p className="text-lg md:text-xl text-white mb-8 max-w-md md:max-w-none mx-auto md:mx-0">
              Skilled Administrative Support Professional with 23 years'
              experience in (EHS).
            </p>
            {/* <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xl font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-blue-900 transition duration-300 transform hover:scale-105">
              Connect with me!
            </button> */}
          </div>

          {/* Right Side: Profile Picture */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-72 h-72 md:w-88 md:h-96 overflow-hidden shadow-2xl border-4">
              <img
                src={headerProfilePicUrl}
                alt="Profile Picture"
                className="absolute inset-0 w-full h-full object-cover object-right"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 py-12 text-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-400 text-center drop-shadow-lg">
          Founder & Chief Coordinator of{" "}
          <span className="text-white">WWW.GEHSPO.COM</span>
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-3">
            Education Background
          </h2>
          <p className="text-lg leading-relaxed">
            Mr. Ghanta Bharat has done Graduation in Physics.
          </p>
        </section>

        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold text-blue-300 mb-3">
                Trainings
              </h2>
              <ul className="list-disc list-inside text-lg leading-relaxed space-y-1">
                <li>
                  NEBOSH Passport Training in Chemical Safety from St. John
                  Health & Safety
                </li>
                <li>
                  Accredited by ROSPA What Everyone Needs to Know About Permit
                  to Work
                </li>
                <li>
                  CPD Certified HAZWOPERM: Hazardous Waste Operations and
                  Emergency Response Management
                </li>
                <li>
                  CPD Certified MOC: Management of Change in Process Safety
                </li>
                <li>
                  EFSP- (Essentials of Fire Safety Principles) from Dubai KHDA -
                  UAE
                </li>
                <li>FAW- (First Aid at Work) from Dubai KHDA - UAE</li>
                <li>
                  NCFE Certified LEVEL - 3 Award in Health and Safety for the
                  workplace from UK
                </li>
                <li>Qualified First-Aider from St John's Ambulance</li>
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-blue-300 mb-3">
                Certifications
              </h2>
              <ul className="list-disc list-inside text-lg leading-relaxed space-y-1">
                <li>P.G. Diploma in Industrial Safety from SBTET</li>
                <li>NEBOSH-IGC from NEBOSH Board - U.K.</li>
                <li>IOSH MS from IOSH Board - U.K.</li>
                <li>
                  IRCA Approved OHSMS ISO 45001:2018 Lead Auditor from TUV -
                  Germany
                </li>
                <li>
                  IRCA Approved EMS ISO 14001:2015 Lead Auditor from TUV -
                  Germany
                </li>
                <li>
                  CPD Certified IMS ISO 9001:2015, ISO 14001:2015 & OHSAS
                  18001:20117 Internal Auditor
                </li>
                <li>NEBOSH-PSM</li>
                <li>NEBOSH-HAZOP</li>
                <li>Lean Six Sigma Black Belt</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-300 mb-3">
            Experience
          </h2>
          <p className="text-lg leading-relaxed">
            Mr. Ghanta Bharat is having 23 years of experience in EHS Domain,
            including Construction in Green Field Projects & Running Projects,
            O&M of Thermal Power Plants, Manufacturing of Solar Modules, Steel
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
            reasons such as frequent changes in standards and laws, management
            not knowing the benefits of EHS, employers and employees lacking
            required knowledge, neglecting EHS for the sake of targets by middle
            management, governing bodies not working up to standards, and
            workforce not having sufficient EHS knowledge. <br />
            <br />
            <span className="font-semibold text-blue-200">
              WWW.GEHSPO.COM
            </span>{" "}
            is formed to enhance the EHS profession by providing knowledge to
            EHS professionals, irrespective of experience, to implement EHS in
            their respective industries.
          </p>
        </section>

        {/* Professional Experience with Leading Companies Section (from previous request) */}
        <section className="mb-8 mt-16">
          <h2 className="text-3xl font-semibold text-blue-300 mb-6 text-center">
            Professional Experience with Leading Companies
          </h2>

          {/* Infinite Scroll Container */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="flex animate-infinite-scroll space-x-8 pause-on-hover">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-56 h-32 flex items-center justify-center bg-gray-800 rounded-lg p-2 shadow-lg"
                >
                  <img
                    src={logo}
                    alt={`Company Logo ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>{" "}
      {/* End of max-w-5xl mx-auto px-4 py-12 text-gray-100 */}
      {/* Scoped CSS for the infinite scroll animation */}
      <style jsx>{`
        @keyframes infinite-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
          width: fit-content;
          will-change: transform;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
    </>
  );
}
