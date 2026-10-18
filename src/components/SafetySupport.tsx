import React from 'react';
import { ShieldAlert, PhoneCall, HeartHandshake, LifeBuoy, HeartPulse } from 'lucide-react';
import type { LanguageCode } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface SafetySupportProps {
  currentLanguage?: LanguageCode;
  onOpenWellness: () => void;
}

export const SafetySupport: React.FC<SafetySupportProps> = ({ currentLanguage = 'en', onOpenWellness }) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;
  const verifiedHelplines = [
    {
      name: 'Tele-MANAS (Govt. of India)',
      number: '14416 / 1800 891 4416',
      availability: currentLanguage === 'hi' ? '24/7, निःशुल्क (टोल-फ्री), 20+ क्षेत्रीय भाषाएँ' : currentLanguage === 'mr' ? '24/7, मोफत, 20+ प्रादेशिक भाषा' : '24/7, Toll-Free, 20+ Regional Languages',
      badge: currentLanguage === 'hi' ? 'राष्ट्रीय प्राथमिक हेल्पलाइन' : currentLanguage === 'mr' ? 'राष्ट्रीय प्राथमिक हेल्पलाइन' : 'National Primary Helpline',
      desc: currentLanguage === 'hi' ? 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय द्वारा शुरू किया गया आधिकारिक राष्ट्रीय टेली मेंटल हेल्थ कार्यक्रम।' : currentLanguage === 'mr' ? 'आरोग्य व कुटुंब कल्याण मंत्रालयाचा अधिकृत राष्ट्रीय टेलि मानसिक आरोग्य उपक्रम.' : 'Official National Tele Mental Health Programme of India launched by Ministry of Health & Family Welfare. Direct access to certified counselors in your state and mother tongue.'
    },
    {
      name: 'KIRAN Mental Health Line',
      number: '1800 599 0019',
      availability: currentLanguage === 'hi' ? '24/7, निःशुल्क (टोल-फ्री)' : currentLanguage === 'mr' ? '24/7, मोफत (टोल-फ्री)' : '24/7, Toll-Free',
      badge: currentLanguage === 'hi' ? 'सामाजिक न्याय एवं अधिकारिता मंत्रालय' : currentLanguage === 'mr' ? 'सामाजिक न्याय व सक्षमीकरण' : 'Govt. Social Justice & Empowerment',
      desc: currentLanguage === 'hi' ? 'प्राथमिक मनोवैज्ञानिक स्क्रीनिंग, संकट प्रबंधन, भावनात्मक प्राथमिक चिकित्सा और रेफरल सहायता।' : currentLanguage === 'mr' ? 'प्राथमिक मानसिक समुपदेशन, भावनिक प्रथमोपचार व मार्गदर्शन.' : 'Dedicated helpline providing primary psychological screening, distress management, emotional first-aid, and mental health referrals.'
    },
    {
      name: 'National Emergency Response',
      number: '112',
      availability: currentLanguage === 'hi' ? '24/7 राष्ट्रव्यापी आपातकालीन सेवा' : currentLanguage === 'mr' ? '24/7 देशव्यापी आपत्कालीन सेवा' : '24/7 Nationwide Emergency Dispatch',
      badge: currentLanguage === 'hi' ? 'तात्कालिक सुरक्षा' : currentLanguage === 'mr' ? 'तातडीची सुरक्षा' : 'Immediate Physical Safety',
      desc: currentLanguage === 'hi' ? 'पुलिस, अग्निशमन और एम्बुलेंस आपात स्थितियों के लिए एकीकृत आपातकालीन प्रतिक्रिया सहायता प्रणाली।' : currentLanguage === 'mr' ? 'पोलीस, अग्निशामक आणि रुग्णवाहिकेसाठी एकात्मिक आपत्कालीन सेवा.' : 'Unified emergency response support system for police, fire, and medical ambulance emergencies across India.'
    },
    {
      name: 'Vandrevala Foundation Helpline',
      number: '+91 9999 666 555',
      availability: currentLanguage === 'hi' ? '24/7 निःशुल्क परामर्श' : currentLanguage === 'mr' ? '24/7 मोफत समुपदेशन' : '24/7 Free Counseling Support',
      badge: currentLanguage === 'hi' ? 'प्रमाणित एनजीओ' : currentLanguage === 'mr' ? 'सत्यापित अशासकीय संस्था' : 'Verified Non-Profit',
      desc: currentLanguage === 'hi' ? 'अनुभवी संकट हस्तक्षेप परामर्शदाता और मानसिक स्वास्थ्य पेशेवर पूरे भारत में गोपनीय टेलीफोनिक परामर्श प्रदान करते हैं।' : currentLanguage === 'mr' ? 'अनुभवी समुपदेशकांकडून गोपनीय व मोफत मानसिक आरोग्य मार्गदर्शन.' : 'Experienced crisis intervention counselors and mental health professionals offering confidential telephonic counseling across India.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Acute Crisis Banner */}
      <div className="crisis-warning-banner">
        <div className="crisis-banner-icon">
          <ShieldAlert size={28} />
        </div>
        <div>
          <h3 className="crisis-banner-title">
            {t.support.crisisTitle}
          </h3>
          <p className="crisis-banner-text">
            {t.support.crisisText}
          </p>
          <a 
            href="tel:14416"
            className="crisis-primary-action-btn"
          >
            <PhoneCall size={16} />
            <span>{currentLanguage === 'hi' ? 'टेली-मानस को कॉल करें: 14416 (24/7 निःशुल्क)' : currentLanguage === 'mr' ? 'टेलि-मानस हेल्पलाइन: 14416 (24/7 मोफत)' : 'Call Tele-MANAS: 14416 (24/7 Toll-Free)'}</span>
          </a>
        </div>
      </div>

      {/* Verified Indian Helplines List */}
      <div>
        <div className="section-pre-title">
          <LifeBuoy size={14} color="#e11d48" />
          <span>{currentLanguage === 'hi' ? 'सरकारी एवं सत्यापित सेवाएँ' : currentLanguage === 'mr' ? 'शासकीय व अधिकृत सेवा' : 'GOVERNMENT & VERIFIED SERVICES'}</span>
        </div>
        <h3 className="section-main-heading" style={{ fontSize: '1.4rem', marginBottom: '16px' }}>
          {t.support.verifiedHelplines}
        </h3>

        <div className="helpline-cards-grid">
          {verifiedHelplines.map((item, idx) => (
            <div key={idx} className="card-panel helpline-card">
              <div>
                <div className="helpline-card-badges">
                  <span className="helpline-badge-name">
                    {item.badge}
                  </span>
                  <span className="helpline-badge-hours">
                    {item.availability}
                  </span>
                </div>
                <h4 className="helpline-name">
                  {item.name}
                </h4>
                <p className="helpline-desc">
                  {item.desc}
                </p>
              </div>

              <div className="helpline-card-action">
                <span className="helpline-number">
                  {item.number}
                </span>
                <a
                  href={`tel:${item.number.split('/')[0].replace(/\s+/g, '')}`}
                  className="helpline-call-btn"
                >
                  <PhoneCall size={12} /> {t.support.callNow}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Non-Crisis Human Support Guide */}
      <div className="card-panel">
        <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#1c1917', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HeartHandshake size={20} color="#8b5cf6" />
          <span>Non-Crisis Steps: Talking to Trusted People in Your Life</span>
        </h3>

        <div className="support-scripts-grid">
          <div className="support-script-card">
            <strong className="script-title">
              1. For Students: Approaching a Mentor or Counselor
            </strong>
            <p className="script-quote">
              "I have been feeling quite overwhelmed with exams lately and it is affecting my sleep and focus. Could we find 10 minutes to talk?"
            </p>
          </div>

          <div className="support-script-card">
            <strong className="script-title">
              2. For Working Adults: Sharing with a Partner or Friend
            </strong>
            <p className="script-quote">
              "I am feeling close to burnout with the sheer volume of deadlines. I do not need solutions right away, just a safe space to vent."
            </p>
          </div>

          <div className="support-script-card">
            <strong className="script-title">
              3. Finding a Licensed Psychologist
            </strong>
            <p className="script-quote">
              Look for RCI-registered (Rehabilitation Council of India) clinical psychologists or verified platforms like NIMHANS, iCALL, or hospital OPDs.
            </p>
          </div>
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
          <button
            onClick={onOpenWellness}
            className="decompress-cta-btn"
          >
            <HeartPulse size={16} /> Need to decompress first? Try Calming Exercises
          </button>
        </div>
      </div>
    </div>
  );
};
