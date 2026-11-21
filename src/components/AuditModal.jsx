import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Building2, 
  MapPin, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  Mail, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { getAssetUrl } from '../utils/assetUrl';
import styles from './AuditModal.module.css';

const SPECIALIZATIONS = [
  'Multi-Specialty Hospital',
  'IVF & Fertility Center',
  'Orthopedics & Spine',
  'Cardiology & Vascular',
  'Oncology & Surgical Care',
  'Pediatrics & Maternity',
  'Doctor OPD / Super-Specialty Clinic',
  'Dental / Cosmetic Center'
];

const TARGET_OPTIONS = [
  '50 – 100 Patients',
  '100 – 300 Patients',
  '300+ Patients'
];

export default function AuditModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    hospitalName: '',
    city: '',
    specialty: 'Multi-Specialty Hospital',
    targetPatients: '100 – 300 Patients',
    notes: '',
    consentWhatsApp: true
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const modalRef = useRef(null);

  // 1. Scroll Lock on body
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // 2. Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !submitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitting, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !submitting) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please enter your phone number';
    } else if (!/^[0-9+\s-]{8,16}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.hospitalName.trim()) newErrors.hospitalName = 'Please enter hospital or clinic name';
    if (!formData.city.trim()) newErrors.city = 'Please enter city';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.5 },
          colors: ['#00E5FF', '#38BDF8', '#0EA5E9', '#00FF99', '#FFFFFF']
        });
      } catch (err) {}
    }, 600);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      phone: '',
      hospitalName: '',
      city: '',
      specialty: 'Multi-Specialty Hospital',
      targetPatients: '100 – 300 Patients',
      notes: '',
      consentWhatsApp: true
    });
    onClose();
  };

  // WhatsApp payload
  const whatsappText = encodeURIComponent(
    `Hello Amplify Healthcare, I would like to schedule a Confidential Hospital Audit.\n\n` +
    `Name: ${formData.fullName || 'Doctor / Administrator'}\n` +
    `Hospital: ${formData.hospitalName || 'Not specified'}\n` +
    `City: ${formData.city || 'Not specified'}\n` +
    `Specialty: ${formData.specialty}\n` +
    `Target: ${formData.targetPatients}`
  );
  const whatsappUrl = `https://wa.me/919766988873?text=${whatsappText}`;
  const gmailUrl = `mailto:aditya@amplifydigitalservices.com?subject=${encodeURIComponent('Hospital Audit Request — ' + (formData.hospitalName || 'Healthcare Center'))}&body=${whatsappText}`;

  const handleCopyPhone = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('+919766988873').then(() => {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2400);
      });
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-modal-title"
    >
      <div className={styles.modalBackdropBlur} />

      {/* The Master Glassmorphic Frame with Healthcare Cyan Gradient Outer Rim */}
      <div ref={modalRef} className={styles.modalCardFrame}>
        
        {/* Close Button at top-right */}
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className={styles.closeBtn}
          aria-label="Close audit dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Inner Chassis */}
        <div className={styles.modalChassis}>
          {submitted ? (
            /* Success State */
            <div className={styles.successContainer}>
              <div className={styles.successIconWrapper}>
                <CheckCircle2 size={40} className="text-[#00E5FF]" />
              </div>

              <h3 className={styles.successTitle}>
                Hospital Audit Scheduled!
              </h3>

              <p className={styles.successDesc}>
                Thank you, <strong>{formData.fullName}</strong>. Your confidential assessment has been logged. Our clinical growth director will review your patient pipeline and connect within 24 hours.
              </p>

              <div className={styles.successRecap}>
                <div className={styles.recapRow}>
                  <span className={styles.recapLabel}>Hospital / Center:</span>
                  <span className="font-semibold text-white">{formData.hospitalName}</span>
                </div>
                <div className={styles.recapRow}>
                  <span className={styles.recapLabel}>Discipline:</span>
                  <span className="text-cyan-200">{formData.specialty}</span>
                </div>
                <div className={styles.recapRow}>
                  <span className={styles.recapLabel}>Location:</span>
                  <span>{formData.city}</span>
                </div>
                <div className={styles.recapRow}>
                  <span className={styles.recapLabel}>Target OPD:</span>
                  <span className="text-[#00FF99] font-medium">{formData.targetPatients}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetAndClose}
                className={styles.successCloseBtn}
              >
                Done &amp; Return to Website
              </button>
            </div>
          ) : (
            /* 2-Column Layout (Brand Panel + Form) */
            <div className={styles.twoColLayout}>
              
              {/* Left Column: Brand & Value Proposition Panel */}
              <div className={styles.leftCol}>
                <div className={styles.ambientAtmosphere} />
                <div className={styles.ambientGlowCyan} />

                {/* Brand Header */}
                <div className={styles.brandRow}>
                  <img
                    src={getAssetUrl('assets/amplify-healthcare-logo.png')}
                    alt="Amplify Healthcare Logo"
                    className={styles.brandLogoImg}
                  />
                </div>

                {/* Typography Block */}
                <div className={styles.typographyBlock}>
                  <div className={styles.kickerTag}>
                    <span className={styles.kickerText}>CONFIDENTIAL HOSPITAL AUDIT</span>
                  </div>

                  <h2 id="audit-modal-title" className={styles.mainHeadline}>
                    Transforming <br />
                    Healthcare Into <br />
                    <span className={styles.impactfulText}>Authority.</span>
                  </h2>

                  <p className={styles.supportingCopy}>
                    Share your center details and our healthcare growth directors will audit your OPD acquisition, doctor branding, and patient conversion channels.
                  </p>
                </div>

                {/* Floating 3D Origami Brand Sculpture Artwork */}
                <div className={styles.artworkContainer}>
                  <div className={styles.birdGlowHalo} />
                  <img
                    src={getAssetUrl('assets/contact-bird-render.jpg')}
                    alt="Amplify 3D Origami Sculpture"
                    className={styles.sculptureImage}
                    loading="eager"
                  />
                </div>
              </div>

              {/* Right Column: Intake Form */}
              <div className={styles.rightCol}>
                <form onSubmit={handleSubmit} noValidate className={styles.formContainer}>
                  <div className={styles.inputsGrid}>
                    
                    {/* Field 1: Doctor / Administrator Name * */}
                    <div className={styles.fieldCol}>
                      <label className={styles.fieldLabel} htmlFor="fullName">
                        Your Name <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <div className={`${styles.inputWrapper} ${errors.fullName ? styles.inputError : ''}`}>
                        <User size={16} className={styles.inputIcon} />
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="Dr. Name / Hospital Admin"
                          className={styles.inputField}
                          autoComplete="name"
                          disabled={submitting}
                        />
                      </div>
                      {errors.fullName && <span className={styles.errorMessage}>{errors.fullName}</span>}
                    </div>

                    {/* Field 2: Phone Number / WhatsApp * */}
                    <div className={styles.fieldCol}>
                      <label className={styles.fieldLabel} htmlFor="phone">
                        Phone / WhatsApp <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <div className={`${styles.inputWrapper} ${errors.phone ? styles.inputError : ''}`}>
                        <Phone size={16} className={styles.inputIcon} />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className={styles.inputField}
                          autoComplete="tel"
                          disabled={submitting}
                        />
                      </div>
                      {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                    </div>

                    {/* Field 3: Hospital or Clinic Name * */}
                    <div className={styles.fieldCol}>
                      <label className={styles.fieldLabel} htmlFor="hospitalName">
                        Hospital / Clinic Name <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <div className={`${styles.inputWrapper} ${errors.hospitalName ? styles.inputError : ''}`}>
                        <Building2 size={16} className={styles.inputIcon} />
                        <input
                          type="text"
                          id="hospitalName"
                          name="hospitalName"
                          value={formData.hospitalName}
                          onChange={handleChange}
                          placeholder="Apollo, Care Clinic, etc."
                          className={styles.inputField}
                          disabled={submitting}
                        />
                      </div>
                      {errors.hospitalName && <span className={styles.errorMessage}>{errors.hospitalName}</span>}
                    </div>

                    {/* Field 4: City / State * */}
                    <div className={styles.fieldCol}>
                      <label className={styles.fieldLabel} htmlFor="city">
                        City / Location <span className={styles.requiredAsterisk}>*</span>
                      </label>
                      <div className={`${styles.inputWrapper} ${errors.city ? styles.inputError : ''}`}>
                        <MapPin size={16} className={styles.inputIcon} />
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Nagpur, Mumbai, Pune, etc."
                          className={styles.inputField}
                          disabled={submitting}
                        />
                      </div>
                      {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
                    </div>

                    {/* Field 5: Medical Specialization */}
                    <div className={`${styles.fieldCol} ${styles.colSpanFull}`}>
                      <label className={styles.fieldLabel} htmlFor="specialty">
                        Medical Specialty / Department
                      </label>
                      <div className={styles.inputWrapper}>
                        <select
                          id="specialty"
                          name="specialty"
                          value={formData.specialty}
                          onChange={handleChange}
                          className={styles.selectField}
                          disabled={submitting}
                        >
                          {SPECIALIZATIONS.map((spec) => (
                            <option key={spec} value={spec}>
                              {spec}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Field 6: Target Monthly Patient Flow */}
                    <div className={`${styles.fieldCol} ${styles.colSpanFull}`}>
                      <label className={styles.fieldLabel}>
                        Target Monthly Patient Growth
                      </label>
                      <div className={styles.pillsRow}>
                        {TARGET_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, targetPatients: opt }))}
                            className={`${styles.pillBtn} ${formData.targetPatients === opt ? styles.pillBtnActive : ''}`}
                            disabled={submitting}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Field 7: Additional Clinical Notes */}
                    <div className={`${styles.fieldCol} ${styles.colSpanFull}`}>
                      <label className={styles.fieldLabel} htmlFor="notes">
                        Key Growth Objectives or Notes (Optional)
                      </label>
                      <div className={styles.inputWrapper}>
                        <MessageSquare size={16} className={styles.inputIcon} />
                        <textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Tell us about your OPD challenges, doctors, or target procedures..."
                          className={styles.textareaField}
                          disabled={submitting}
                        />
                      </div>
                    </div>

                  </div>

                  {/* WhatsApp Consent */}
                  <label className={styles.consentRow}>
                    <input
                      type="checkbox"
                      name="consentWhatsApp"
                      checked={formData.consentWhatsApp}
                      onChange={handleChange}
                      className="w-4 h-4 rounded text-[#00E5FF] focus:ring-0 cursor-pointer"
                    />
                    <span className={styles.consentText}>
                      Send confidential audit report &amp; growth metrics via WhatsApp / Email
                    </span>
                  </label>

                  {/* Submit Button */}
                  <div className={styles.submitBtnWrapper}>
                    <button
                      type="submit"
                      disabled={submitting}
                      className={styles.submitBtn}
                    >
                      <span className={styles.btnSpecularSheen} />
                      {submitting ? (
                        <>
                          <Loader2 size={17} className="animate-spin" />
                          <span>Generating Audit Plan...</span>
                        </>
                      ) : (
                        <>
                          <span>Schedule Hospital Audit</span>
                          <ArrowRight size={17} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Quick Contact Actions: WhatsApp, Gmail, Call */}
                  <div className={styles.quickActionsContainer}>
                    <span className={styles.dividerText}>OR CONNECT WITH OUR TEAM DIRECTLY</span>
                    <div className={styles.buttonsGrid}>
                      
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionCard}
                      >
                        <div className={styles.actionIconWrap}>
                          <MessageSquare size={14} />
                        </div>
                        <div className={styles.actionTextWrap}>
                          <span className={styles.actionTitle}>WhatsApp</span>
                          <span className={styles.actionSubtext}>Quick Chat</span>
                        </div>
                      </a>

                      <a
                        href={gmailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.actionCard}
                      >
                        <div className={styles.actionIconWrap}>
                          <Mail size={14} />
                        </div>
                        <div className={styles.actionTextWrap}>
                          <span className={styles.actionTitle}>Email</span>
                          <span className={styles.actionSubtext}>aditya@amplify</span>
                        </div>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyPhone}
                        className={styles.actionCard}
                      >
                        <div className={styles.actionIconWrap}>
                          {copiedPhone ? <Check size={14} className="text-[#00FF99]" /> : <Phone size={14} />}
                        </div>
                        <div className={styles.actionTextWrap}>
                          <span className={styles.actionTitle}>{copiedPhone ? 'Copied!' : 'Call Us'}</span>
                          <span className={styles.actionSubtext}>+91 97669 88873</span>
                        </div>
                      </button>

                    </div>
                  </div>

                </form>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
