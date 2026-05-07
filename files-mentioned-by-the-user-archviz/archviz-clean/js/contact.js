// ─── Elite Contact Page ───────────────────────────────────────────────────────

function openContact() {
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="project-page">
      <div class="overlay-topbar">
        <div class="overlay-kicker">Get In Touch</div>
        <button class="overlay-close" onclick="closeOverlay()">Close</button>
      </div>

      <main class="ct-page">

        <!-- ── Hero ─────────────────────────────────────────────────────────── -->
        <section class="ct-hero">
          <p class="pin-kicker">Let's build something remarkable</p>
          <h2 class="ct-hero-title">Every great space starts<br>with a single conversation.</h2>
          <p class="ct-hero-sub">
            Tell us about your vision. Whether it's a family villa, a commercial tower,
            a full interior fit-out, or a renovation — our team will respond within
            24 hours with a personalised project overview.
          </p>
        </section>

        <!-- ── Main layout: form + sidebar ──────────────────────────────────── -->
        <div class="ct-layout">

          <!-- Left: Inquiry form -->
          <div class="ct-form-wrap">
            <p class="ct-form-label">Send us a brief</p>

            <form class="ct-form" id="ctForm" onsubmit="handleContactSubmit(event)">

              <div class="ct-row-2">
                <div class="ct-field">
                  <label for="ctName">Your Name</label>
                  <input id="ctName" type="text" placeholder="Arjun Sharma" required>
                </div>
                <div class="ct-field">
                  <label for="ctPhone">Phone / WhatsApp</label>
                  <input id="ctPhone" type="tel" placeholder="+91 98765 43210">
                </div>
              </div>

              <div class="ct-field">
                <label for="ctEmail">Email Address</label>
                <input id="ctEmail" type="email" placeholder="arjun@example.com" required>
              </div>

              <div class="ct-row-2">
                <div class="ct-field">
                  <label for="ctService">Service Required</label>
                  <select id="ctService">
                    <option value="" disabled selected>Select a service</option>
                    <option>Residential Construction</option>
                    <option>Commercial Construction</option>
                    <option>Interior Design & Fit-Out</option>
                    <option>Renovation & Refurbishment</option>
                    <option>Architectural Visualisation</option>
                    <option>Other / Not Sure</option>
                  </select>
                </div>
                <div class="ct-field">
                  <label for="ctBudget">Approximate Budget</label>
                  <select id="ctBudget">
                    <option value="" disabled selected>Select range</option>
                    <option>Under ₹25 Lakh</option>
                    <option>₹25 – 75 Lakh</option>
                    <option>₹75 Lakh – 1.5 Cr</option>
                    <option>₹1.5 – 5 Cr</option>
                    <option>Above ₹5 Cr</option>
                    <option>Not decided yet</option>
                  </select>
                </div>
              </div>

              <div class="ct-field">
                <label for="ctCity">Project City / Location</label>
                <input id="ctCity" type="text" placeholder="Chennai, Bengaluru, Coimbatore…">
              </div>

              <div class="ct-field">
                <label for="ctMsg">Tell us about your project</label>
                <textarea id="ctMsg" rows="5" placeholder="Describe your project — site size, number of floors, preferred style, timeline, and anything else that matters to you."></textarea>
              </div>

              <div class="ct-field ct-field-check">
                <label class="ct-checkbox">
                  <input type="checkbox" id="ctConsent" required>
                  <span>I agree to be contacted by AV Archviz regarding my enquiry.</span>
                </label>
              </div>

              <button type="submit" class="ct-submit" id="ctSubmitBtn">
                <span>Send Enquiry</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>
              </button>

              <div class="ct-success" id="ctSuccess" style="display:none;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <div>
                  <b>Enquiry received — thank you!</b>
                  <p>Our team will reach out within 24 hours with a personalised response.</p>
                </div>
              </div>

            </form>
          </div>

          <!-- Right: Sidebar -->
          <aside class="ct-sidebar">

            <!-- Quick contact -->
            <div class="ct-info-card">
              <p class="ct-info-label">Direct Contact</p>
              <a class="ct-info-row" href="mailto:studio@avarchviz.com">
                <div class="ct-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <span>Email us</span>
                  <b>studio@avarchviz.com</b>
                </div>
              </a>
              <a class="ct-info-row" href="tel:+919876543210">
                <div class="ct-info-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <span>Call us</span>
                  <b>+91 98765 43210</b>
                </div>
              </a>
              <a class="ct-info-row" href="https://wa.me/919876543210" target="_blank">
                <div class="ct-info-icon" style="color:#25d366;">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                </div>
                <div>
                  <span>WhatsApp</span>
                  <b>Chat instantly</b>
                </div>
              </a>
            </div>

            <!-- Office locations -->
            <div class="ct-info-card">
              <p class="ct-info-label">Our Offices</p>
              <div class="ct-office">
                <b>Chennai <span class="ct-office-badge">HQ</span></b>
                <p>14, Anna Salai, Design District<br>Nungambakkam, Chennai – 600 034</p>
              </div>
              <div class="ct-office">
                <b>Bengaluru</b>
                <p>3rd Floor, 42 MG Road<br>Indiranagar, Bengaluru – 560 038</p>
              </div>
              <div class="ct-office" style="border-bottom:none;padding-bottom:0;">
                <b>Coimbatore</b>
                <p>22 Avinashi Road, RS Puram<br>Coimbatore – 641 002</p>
              </div>
            </div>

            <!-- Hours -->
            <div class="ct-info-card">
              <p class="ct-info-label">Studio Hours</p>
              <div class="ct-hours">
                <span>Mon – Fri</span><b>9:00 AM – 7:00 PM</b>
              </div>
              <div class="ct-hours">
                <span>Saturday</span><b>10:00 AM – 4:00 PM</b>
              </div>
              <div class="ct-hours" style="border-bottom:none;">
                <span>Sunday</span><b style="color:rgba(255,255,255,0.35);">By appointment only</b>
              </div>
            </div>

            <!-- Social -->
            <div class="ct-socials">
              <a class="ct-social-btn" href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                Instagram
              </a>
              <a class="ct-social-btn" href="#" aria-label="Pinterest">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.772 0 3.138-1.868 3.138-4.566 0-2.386-1.717-4.056-4.165-4.056-2.837 0-4.502 2.128-4.502 4.328 0 .857.33 1.775.742 2.277a.3.3 0 0 1 .069.286c-.076.314-.244.995-.277 1.134-.044.183-.145.222-.334.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.938.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg>
                Pinterest
              </a>
              <a class="ct-social-btn" href="#" aria-label="Behance">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.443 5.35c.639 0 1.23.05 1.77.198.541.099.984.297 1.377.546.394.248.689.595.886 1.042.197.446.296.992.296 1.587 0 .694-.148 1.29-.493 1.736-.296.446-.788.843-1.378 1.14.838.248 1.477.695 1.87 1.34.394.644.64 1.437.64 2.33 0 .695-.148 1.34-.394 1.884-.246.547-.64 1.043-1.08 1.44-.492.397-1.03.694-1.67.893-.64.198-1.28.297-1.97.297H1V5.35h6.443zm-.394 5.54c.542 0 .985-.148 1.33-.396.345-.248.542-.694.542-1.24 0-.297-.05-.546-.148-.744-.099-.198-.248-.396-.444-.496-.197-.1-.394-.198-.64-.248-.247-.05-.493-.05-.788-.05H4.1v3.174h2.95zm.148 5.937c.296 0 .59-.05.886-.099.296-.099.542-.198.788-.347.247-.148.443-.396.59-.644.148-.297.198-.645.198-1.092 0-.843-.246-1.44-.689-1.786-.443-.347-1.03-.496-1.72-.496H4.1v4.464h3.097zm10.115-2.675c.394.397.984.595 1.77.595.541 0 1.03-.148 1.426-.396.394-.248.64-.546.739-.843h2.557c-.394 1.24-1.03 2.13-1.869 2.676-.838.546-1.869.843-3.05.843-.837 0-1.573-.148-2.262-.397-.64-.247-1.23-.644-1.672-1.09-.443-.496-.788-1.043-.985-1.688-.247-.645-.345-1.34-.345-2.082 0-.744.148-1.44.395-2.083.246-.644.59-1.19 1.032-1.686.443-.446.984-.843 1.622-1.09.639-.249 1.329-.398 2.117-.398.837 0 1.573.149 2.213.447.64.297 1.18.694 1.622 1.24.443.496.788 1.092.985 1.787.197.645.296 1.34.246 2.084h-7.642c0 .843.296 1.587.739 1.934l-.639-.653zm3.295-4.762c-.345-.347-.886-.545-1.573-.545-.443 0-.837.099-1.13.247-.296.148-.541.347-.689.546-.197.198-.296.446-.345.645-.05.198-.099.396-.099.545h4.68c-.099-.694-.394-1.14-.844-1.438zm-3.69-4.167h5.715v1.34H16.917V5.222z"/></svg>
                Behance
              </a>
            </div>

          </aside>
        </div>

      </main>
    </div>`;

  openOverlay();

  // Wire up form submit
  const form = document.getElementById('ctForm');
  if (form) form.addEventListener('submit', handleContactSubmit);
}

// ── Form handler ──────────────────────────────────────────────────────────────
function handleContactSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('ctSubmitBtn');
  const success = document.getElementById('ctSuccess');
  const form    = document.getElementById('ctForm');

  if (btn) {
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Sending…';
  }

  // Simulate send (replace with real API call in production)
  setTimeout(() => {
    if (form)    form.querySelectorAll('input,select,textarea,button[type=submit]').forEach(el => el.style.opacity = '0.35');
    if (btn)     btn.style.display = 'none';
    if (success) success.style.display = 'flex';
  }, 1200);
}
