import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetupStep9.css";

const paymentMethods = [
  {
    key: "paypal",
    label: "PayPal",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#2563eb" opacity="0.12"/>
        <path d="M10 24l1.5-10.5h5.5c2.5 0 4 1.4 3.5 4.1-.4 2.3-2.3 3.4-4.6 3.4h-2.5" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"/>
        <circle cx="24" cy="10" r="2" fill="#2563eb"/>
      </svg>
    ),
    desc: "Quick & secure",
  },
  {
    key: "bank",
    label: "Bank Account",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#10b981" opacity="0.12"/>
        <rect x="8" y="12" width="16" height="8" rx="2" stroke="#10b981" strokeWidth="2"/>
        <rect x="11" y="15" width="3" height="2" rx="1" fill="#10b981"/>
        <rect x="18" y="15" width="3" height="2" rx="1" fill="#10b981"/>
      </svg>
    ),
    desc: "Direct transfer",
  },
  {
    key: "card",
    label: "Credit Card",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" rx="8" fill="#a21caf" opacity="0.12"/>
        <rect x="8" y="12" width="16" height="8" rx="2" stroke="#a21caf" strokeWidth="2"/>
        <rect x="11" y="17" width="4" height="2" rx="1" fill="#a21caf"/>
        <rect x="17" y="17" width="4" height="2" rx="1" fill="#a21caf"/>
      </svg>
    ),
    desc: "Instant payments",
  },
];

export default function ProfileSetupStep9() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState("");
  const [paypal, setPaypal] = useState("");
  const [card, setCard] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });
  const [bank, setBank] = useState({
    holder: "",
    number: "",
    bank: "",
    ifsc: "",
    branch: "",
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // Validation helpers
  function validatePaypal(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function validateCardNumber(num) {
    return /^\d{16}$/.test(num.replace(/\s+/g, ""));
  }
  function validateExpiry(exp) {
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(exp);
  }
  function validateCVV(cvv) {
    return /^\d{3}$/.test(cvv);
  }
  function validateBankNumber(num) {
    return num.length > 0;
  }
  function validateIFSC(ifsc) {
    return ifsc.length > 0;
  }

  // Submission handler
  function handleFinish(e) {
    e.preventDefault();
    let newErrors = {};
    if (expanded === "paypal") {
      if (!validatePaypal(paypal)) newErrors.paypal = "Enter a valid PayPal email";
    } else if (expanded === "card") {
      if (!card.name.trim()) newErrors.cardName = "Cardholder name required";
      if (!validateCardNumber(card.number)) newErrors.cardNumber = "16 digits required";
      if (!validateExpiry(card.expiry)) newErrors.cardExpiry = "MM/YY format";
      if (!validateCVV(card.cvv)) newErrors.cardCVV = "3 digits required";
    } else if (expanded === "bank") {
      if (!bank.holder.trim()) newErrors.bankHolder = "Account holder name required";
      if (!validateBankNumber(bank.number)) newErrors.bankNumber = "Account number required";
      if (!bank.bank.trim()) newErrors.bankName = "Bank name required";
      if (!validateIFSC(bank.ifsc)) newErrors.bankIFSC = "IFSC/SWIFT required";
    } else {
      // No method selected, allow skip
      navigate("/personal_space/account-space");
      return;
    }
    setErrors(newErrors);
    setTouched({ paypal: true, card: true, bank: true });
    if (Object.keys(newErrors).length === 0) {
      navigate("/personal_space/account-space");
    }
  }

  function handleExpand(key) {
    setExpanded(key === expanded ? "" : key);
    setErrors({});
    setTouched({});
  }

  return (
    <div className="ps9-root">
      {/* Header */}
      <div className="ps9-header">
        <div className="ps9-header-left">Startrit</div>
        <div className="ps9-header-center">Payment Verification</div>
        <div className="ps9-header-right">
          <span className="ps9-step-label">Profile Setup:</span>
          <span className="ps9-step-blue">Step 9 of 9</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="ps9-progress-bar">
        <div className="ps9-progress-bar-fill" />
      </div>
      {/* Main Card */}
      <form className="ps9-card" onSubmit={handleFinish} autoComplete="off">
        <div className="ps9-title">Add a payment method</div>
        <div className="ps9-subtitle">
          Securely connect your preferred payment option to send or receive payments.
        </div>
        <div className="ps9-methods-row">
          {paymentMethods.map((m) => (
            <div
              key={m.key}
              className={`ps9-method-card${expanded === m.key ? " ps9-method-card-active" : ""}`}
              onClick={() => handleExpand(m.key)}
              tabIndex={0}
              role="button"
              aria-expanded={expanded === m.key}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleExpand(m.key);
              }}
            >
              <div className="ps9-method-icon">{m.icon}</div>
              <div>
                <div className="ps9-method-label">{m.label}</div>
                <div className="ps9-method-desc">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Expanded Forms */}
        {expanded === "paypal" && (
          <div className="ps9-details-box">
            <div className="ps9-details-title">PayPal Details</div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-paypal-email">PayPal Email Address</label>
              <input
                id="ps9-paypal-email"
                type="email"
                className={`ps9-input${touched.paypal && errors.paypal ? " ps9-input-error" : ""}`}
                placeholder="Enter your PayPal email"
                value={paypal}
                onChange={(e) => setPaypal(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, paypal: true }))}
                required
              />
              {touched.paypal && errors.paypal && (
                <div className="ps9-error-msg">{errors.paypal}</div>
              )}
            </div>
          </div>
        )}

        {expanded === "card" && (
          <div className="ps9-details-box">
            <div className="ps9-details-title">Credit / Debit Card Details</div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-card-name">Cardholder Name</label>
              <input
                id="ps9-card-name"
                type="text"
                className={`ps9-input${touched.card && errors.cardName ? " ps9-input-error" : ""}`}
                placeholder="Name on card"
                value={card.name}
                onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, card: true }))}
                autoComplete="cc-name"
                required
              />
              {touched.card && errors.cardName && (
                <div className="ps9-error-msg">{errors.cardName}</div>
              )}
            </div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-card-number">Card Number</label>
              <input
                id="ps9-card-number"
                type="text"
                className={`ps9-input${touched.card && errors.cardNumber ? " ps9-input-error" : ""}`}
                placeholder="1234 5678 9012 3456"
                value={card.number}
                onChange={(e) =>
                  setCard((c) => ({
                    ...c,
                    number: e.target.value.replace(/[^\d]/g, "").slice(0, 16),
                  }))
                }
                onBlur={() => setTouched((t) => ({ ...t, card: true }))}
                inputMode="numeric"
                autoComplete="cc-number"
                required
                maxLength={16}
              />
              {touched.card && errors.cardNumber && (
                <div className="ps9-error-msg">{errors.cardNumber}</div>
              )}
            </div>
            <div className="ps9-form-row ps9-form-row-half">
              <div>
                <label htmlFor="ps9-card-expiry">Expiry Date (MM/YY)</label>
                <input
                  id="ps9-card-expiry"
                  type="text"
                  className={`ps9-input${touched.card && errors.cardExpiry ? " ps9-input-error" : ""}`}
                  placeholder="MM/YY"
                  value={card.expiry}
                  onChange={(e) =>
                    setCard((c) => ({
                      ...c,
                      expiry: e.target.value
                        .replace(/[^\d/]/g, "")
                        .replace(/^([2-9])$/, "0$1")
                        .replace(/^(\d{2})(\d)$/, "$1/$2")
                        .slice(0, 5),
                    }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, card: true }))}
                  inputMode="numeric"
                  autoComplete="cc-exp"
                  required
                  maxLength={5}
                />
                {touched.card && errors.cardExpiry && (
                  <div className="ps9-error-msg">{errors.cardExpiry}</div>
                )}
              </div>
              <div>
                <label htmlFor="ps9-card-cvv">CVV</label>
                <input
                  id="ps9-card-cvv"
                  type="password"
                  className={`ps9-input${touched.card && errors.cardCVV ? " ps9-input-error" : ""}`}
                  placeholder="123"
                  value={card.cvv}
                  onChange={(e) =>
                    setCard((c) => ({
                      ...c,
                      cvv: e.target.value.replace(/[^\d]/g, "").slice(0, 3),
                    }))
                  }
                  onBlur={() => setTouched((t) => ({ ...t, card: true }))}
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  required
                  maxLength={3}
                />
                {touched.card && errors.cardCVV && (
                  <div className="ps9-error-msg">{errors.cardCVV}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {expanded === "bank" && (
          <div className="ps9-details-box">
            <div className="ps9-details-title">Bank Account Details</div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-bank-holder">Account Holder Name</label>
              <input
                id="ps9-bank-holder"
                type="text"
                className={`ps9-input${touched.bank && errors.bankHolder ? " ps9-input-error" : ""}`}
                placeholder="Full name"
                value={bank.holder}
                onChange={(e) => setBank((b) => ({ ...b, holder: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, bank: true }))}
                required
              />
              {touched.bank && errors.bankHolder && (
                <div className="ps9-error-msg">{errors.bankHolder}</div>
              )}
            </div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-bank-number">Account Number</label>
              <input
                id="ps9-bank-number"
                type="text"
                className={`ps9-input${touched.bank && errors.bankNumber ? " ps9-input-error" : ""}`}
                placeholder="Account number"
                value={bank.number}
                onChange={(e) =>
                  setBank((b) => ({
                    ...b,
                    number: e.target.value.replace(/[^\d]/g, ""),
                  }))
                }
                onBlur={() => setTouched((t) => ({ ...t, bank: true }))}
                required
              />
              {touched.bank && errors.bankNumber && (
                <div className="ps9-error-msg">{errors.bankNumber}</div>
              )}
            </div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-bank-name">Bank Name</label>
              <input
                id="ps9-bank-name"
                type="text"
                className={`ps9-input${touched.bank && errors.bankName ? " ps9-input-error" : ""}`}
                placeholder="e.g., HDFC Bank"
                value={bank.bank}
                onChange={(e) => setBank((b) => ({ ...b, bank: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, bank: true }))}
                required
              />
              {touched.bank && errors.bankName && (
                <div className="ps9-error-msg">{errors.bankName}</div>
              )}
            </div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-bank-ifsc">IFSC / SWIFT Code</label>
              <input
                id="ps9-bank-ifsc"
                type="text"
                className={`ps9-input${touched.bank && errors.bankIFSC ? " ps9-input-error" : ""}`}
                placeholder="e.g., HDFC0001234"
                value={bank.ifsc}
                onChange={(e) => setBank((b) => ({ ...b, ifsc: e.target.value }))}
                onBlur={() => setTouched((t) => ({ ...t, bank: true }))}
                required
              />
              {touched.bank && errors.bankIFSC && (
                <div className="ps9-error-msg">{errors.bankIFSC}</div>
              )}
            </div>
            <div className="ps9-form-row">
              <label htmlFor="ps9-bank-branch">
                Branch Name <span className="ps9-optional">(optional)</span>
              </label>
              <input
                id="ps9-bank-branch"
                type="text"
                className="ps9-input"
                placeholder="e.g., MG Road"
                value={bank.branch}
                onChange={(e) => setBank((b) => ({ ...b, branch: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="ps9-security-box">
          <span className="ps9-security-icon" role="img" aria-label="lock">
            🔒
          </span>
          <span className="ps9-security-title">Security Notice</span>
          <ul className="ps9-security-list">
            <li>Your payment information is encrypted and secure</li>
            <li>We use industry-standard security protocols</li>
            <li>Your data is never shared with third parties</li>
            <li>You can update your payment method anytime</li>
          </ul>
        </div>
        <div className="ps9-note">
          Your payment info is securely stored and encrypted.
        </div>
        {/* Navigation */}
        <div className="ps9-nav-row">
          <button
            type="button"
            className="ps9-nav-btn ps9-nav-back"
            onClick={() => navigate("/profile-setup/step8")}
          >
            Back
          </button>
          <div className="ps9-nav-right">
            <button
              type="button"
              className="ps9-nav-btn ps9-nav-skip"
              onClick={() => navigate("/account-space")}
            >
              Skip
            </button>
            <button
              type="submit"
              className="ps9-nav-btn ps9-nav-finish"
            >
              Finish
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
