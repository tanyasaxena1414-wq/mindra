import React from 'react';
import { X, ShieldAlert, PhoneCall } from 'lucide-react';
import type { LanguageCode } from '../types';

interface UrgentHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage?: LanguageCode;
}

export const UrgentHelpModal: React.FC<UrgentHelpModalProps> = ({ isOpen, onClose, currentLanguage = 'en' }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="modal-overlay-backdrop"
      onClick={onClose}
    >
      <div 
        className="modal-window-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-row">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#be123c' }}>
            <ShieldAlert size={22} />
            <strong style={{ fontSize: '1.08rem' }}>
              {currentLanguage === 'hi' ? 'तत्काल सहायता एवं संकट हेल्पलाइन' : currentLanguage === 'mr' ? 'तातडीची मदत आणि संकट हेल्पलाइन' : 'Immediate Support & Crisis Helplines'}
            </strong>
          </div>
          <button 
            onClick={onClose}
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body-content">
          <p className="modal-intro-text">
            {currentLanguage === 'hi' 
              ? 'यदि आप अत्यधिक संकट में हैं या आत्म-हानि का विचार आ रहा है, तो कृपया तुरंत संपर्क करें। प्रशिक्षित और संवेदनशील परामर्शदाता 24/7 सहायता के लिए उपलब्ध हैं।'
              : currentLanguage === 'mr'
              ? 'जर तुम्ही तीव्र मानसिक संकटात असाल किंवा असुरक्षित वाटत असेल, तर कृपया लगेच संपर्क साधा. प्रशिक्षित समुपदेशक 24/7 मदतीसाठी उपलब्ध आहेत.'
              : 'If you are in immediate danger or feeling overwhelmed to the point of self-harm, please reach out right now. Real, compassionate professionals are standing by 24/7 to listen and support you.'}
          </p>

          <div className="modal-helpline-list">
            <div className="modal-helpline-item primary">
              <div>
                <strong className="modal-hl-name" style={{ color: '#0f766e' }}>
                  Tele-MANAS (Govt. of India)
                </strong>
                <span className="modal-hl-desc">
                  {currentLanguage === 'hi' ? '24/7 राष्ट्रीय मानसिक स्वास्थ्य टोल-फ्री हेल्पलाइन' : currentLanguage === 'mr' ? '24/7 राष्ट्रीय मानसिक आरोग्य मोफत हेल्पलाइन' : '24/7 National Mental Health Toll-Free Helpline'}
                </span>
              </div>
              <a 
                href="tel:14416"
                className="modal-call-btn primary"
              >
                <PhoneCall size={14} /> 14416
              </a>
            </div>

            <div className="modal-helpline-item emergency">
              <div>
                <strong className="modal-hl-name" style={{ color: '#be123c' }}>
                  Emergency Services (India)
                </strong>
                <span className="modal-hl-desc">
                  Police, Ambulance, Immediate Medical Dispatch
                </span>
              </div>
              <a 
                href="tel:112"
                className="modal-call-btn emergency"
              >
                <PhoneCall size={14} /> 112
              </a>
            </div>

            <div className="modal-helpline-item standard">
              <div>
                <strong className="modal-hl-name" style={{ color: '#1c1917' }}>
                  KIRAN Mental Health Line
                </strong>
                <span className="modal-hl-desc">
                  Ministry of Social Justice & Empowerment
                </span>
              </div>
              <a 
                href="tel:18005990019"
                className="modal-call-btn standard"
              >
                1800-599-0019
              </a>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '18px' }}>
            <button
              onClick={onClose}
              className="modal-return-btn"
            >
              {currentLanguage === 'hi' ? 'मिन्द्रा प्रोटोटाइप पर वापस जाएँ' : currentLanguage === 'mr' ? 'मिन्द्रा प्रोटोटाइपवर परत जा' : 'Return to Mindra Prototype'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
