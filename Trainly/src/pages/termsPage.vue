<template>
  <div class="min-h-screen bg-white dark:bg-black">
    <!-- Header -->
    <header class="bg-white dark:bg-[#3b3b3b] shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex items-center gap-3">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
          <div>
            <h1 class="text-3xl dark:text-white font-bold text-gray-900">Terms and Conditions</h1>
            <p class="text-sm dark:text-gray-200 text-gray-600 mt-1">
              Last updated: November 5, 2025
            </p>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Sidebar Navigation -->
        <aside class="lg:col-span-1">
          <div
            class="fixed-sidebar dark:bg-[#3b3b3b] dark:text-white bg-white rounded-lg shadow-md p-6 fixed left-8 top-32 w-64 max-h-[calc(100vh-10rem)] overflow-y-auto z-50 hidden lg:block transition-opacity duration-300"
          >
            <h2 class="font-semibold dark:text-white text-gray-900 mb-4">Quick Navigation</h2>
            <nav class="space-y-2">
              <a
                v-for="section in sections"
                :key="section.id"
                :href="`#${section.id}`"
                @click.prevent="scrollToSection(section.id)"
                :class="[
                  'flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors',
                  activeSection === section.id
                    ? 'bg-blue-100 text-blue-700 font-medium dark:bg-blue-600 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300',
                ]"
              >
                <component :is="section.icon" class="w-4 h-4" />
                <span class="dark:text-gray-200 text-xs">{{ section.title }}</span>
              </a>
            </nav>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="lg:col-span-3">
          <div class="bg-white dark:bg-[#3b3b3b] rounded-lg shadow-md p-8 space-y-8">
            <!-- Introduction -->
            <div class="border-l-4 border-blue-500 pl-6">
              <p class="text-gray-700 dark:text-gray-200 leading-relaxed">
                Welcome to our training platform. These Terms and Conditions govern your use of our
                services that connect trainers with trainees. By accessing or using our platform,
                you agree to be bound by these terms.
              </p>
            </div>

            <!-- Section 1: Acceptance -->
            <section id="acceptance" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  1. Acceptance of Terms
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>
                  By creating an account and using our platform, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms and Conditions. If you do not
                  agree to these terms, you must not use our services.
                </p>
                <p>
                  We reserve the right to modify these terms at any time. Continued use of the
                  platform after changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            <!-- Section 2: Definitions -->
            <section id="definitions" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">2. Definitions</h2>
              </div>
              <div
                class="bg-gray-50 dark:bg-[#292929] dark:text-gray-300 rounded-lg p-6 space-y-3 text-gray-700"
              >
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">Platform:</strong> The website,
                  mobile applications, and all related services we provide.
                </p>
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">Trainer:</strong> A registered
                  user who offers training services through our platform.
                </p>
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">Trainee:</strong> A registered
                  user who seeks and receives training services through our platform.
                </p>
                <p>
                  <strong class="dark:text-gray-200 text-gray-900">Services:</strong> All features,
                  content, and functionality available through the platform.
                </p>
              </div>
            </section>

            <!-- Section 3: Registration -->
            <section id="registration" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  3. Account Registration
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-300 text-gray-700">
                <p>
                  To use our platform, you must register for an account and provide accurate,
                  complete, and current information. You are responsible for maintaining the
                  confidentiality of your account credentials.
                </p>
                <div class="bg-blue-50 border dark:bg-blue-200 border-blue-200 rounded-lg p-4">
                  <h3 class="font-semibold text-blue-900 mb-2">Registration Requirements:</h3>
                  <ul class="space-y-2 text-blue-800">
                    <li>• Must be at least 18 years of age</li>
                    <li>• Provide valid email address and contact information</li>
                    <li>• Verify identity as required by the platform</li>
                    <li>• Agree to receive communications from the platform</li>
                  </ul>
                </div>
              </div>
            </section>

            <!-- Section 4: Trainers -->
            <section id="trainers" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  4. Trainer Obligations
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-300 text-gray-700">
                <p>Trainers using our platform agree to the following obligations:</p>
                <div class="space-y-3">
                  <div class="border-l-4 dark:text-gray-300 border-green-500 pl-4">
                    <h3 class="font-semibold  text-gray-900 mb-1">
                      Qualifications
                    </h3>
                    <p>
                      Maintain valid certifications, licenses, and qualifications relevant to the
                      training services offered. Provide proof of credentials upon request.
                    </p>
                  </div>
                  <div class="border-l-4 dark:text-gray-300 border-green-500 pl-4">
                    <h3 class="font-semibold  text-gray-900 mb-1">
                      Professional Conduct
                    </h3>
                    <p>
                      Conduct all training sessions professionally, safely, and in accordance with
                      industry standards. Respect trainee boundaries and maintain appropriate
                      professional relationships.
                    </p>
                  </div>
                  <div class="border-l-4 dark:text-gray-300 border-green-500 pl-4">
                    <h3 class="font-semibold  text-gray-900 mb-1">
                      Service Delivery
                    </h3>
                    <p>
                      Deliver training services as described in your profile. Honor scheduled
                      sessions and provide adequate notice for cancellations or rescheduling.
                    </p>
                  </div>
                  <div class="border-l-4 dark:text-gray-300 border-green-500 pl-4">
                    <h3 class="font-semibold  text-gray-900 mb-1">
                      Safety and Insurance
                    </h3>
                    <p>
                      Maintain appropriate liability insurance. Ensure training environments meet
                      safety standards and comply with all applicable health and safety regulations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 5: Trainees -->
            <section id="trainees" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  5. Trainee Obligations
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>Trainees using our platform agree to the following obligations:</p>
                <div class="space-y-3">
                  <div class="border-l-4 dark:text-gray-200 border-purple-500 pl-4">
                    <h3 class="font-semibold text-gray-900 mb-1">Accurate Information</h3>
                    <p>
                      Provide accurate information about your fitness level, health conditions,
                      injuries, and any other factors relevant to training. Disclose all medical
                      conditions that may affect your ability to train safely.
                    </p>
                  </div>
                  <div class="border-l-4 dark:text-gray-200 border-purple-500 pl-4">
                    <h3 class="font-semibold text-gray-900 mb-1">Medical Clearance</h3>
                    <p>
                      Obtain medical clearance from a healthcare professional before beginning any
                      training program, especially if you have pre-existing health conditions.
                    </p>
                  </div>
                  <div class="border-l-4 dark:text-gray-200 border-purple-500 pl-4">
                    <h3 class="font-semibold text-gray-900 mb-1">Payment Obligations</h3>
                    <p>
                      Pay for services as agreed upon with your trainer. Honor payment commitments
                      and cancellation policies established by the trainer.
                    </p>
                  </div>
                  <div class="border-l-4 dark:text-gray-200 border-purple-500 pl-4">
                    <h3 class="font-semibold text-gray-900 mb-1">Respectful Behavior</h3>
                    <p>
                      Treat trainers with respect and professionalism. Follow instructions during
                      training sessions and communicate openly about concerns or limitations.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- Section 6: Payments -->
            <section id="payments" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  6. Payments and Fees
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>
                  Our platform facilitates payments between trainers and trainees. The following
                  terms apply:
                </p>
                <div class="bg-amber-50 border dark:text-white dark:bg-[#292929] border-amber-200 rounded-lg p-4 space-y-3">
                  <p>
                    <strong class="text-amber-900">Platform Fees:</strong> We charge a service fee
                    on all transactions processed through the platform. This fee is clearly
                    disclosed before any payment is made.
                  </p>
                  <p>
                    <strong class="text-amber-900">Payment Processing:</strong> All payments are
                    processed securely through our third-party payment providers. We do not store
                    credit card information.
                  </p>
                  <p>
                    <strong class="text-amber-900">Refund Policy:</strong> Refunds are subject to
                    the cancellation policy agreed upon between trainer and trainee. Disputes should
                    be resolved directly between parties, with platform mediation available if
                    needed.
                  </p>
                  <p>
                    <strong class="text-amber-900">Trainer Payouts:</strong> Trainers receive
                    payment according to the schedule outlined in their agreement, minus applicable
                    platform fees and payment processing charges.
                  </p>
                </div>
              </div>
            </section>

            <!-- Section 7: Liability -->
            <section id="liability" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">
                  7. Liability and Disputes
                </h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h3 class="font-semibold dark:text-black text-red-900 mb-2">
                    Limitation of Liability
                  </h3>
                  <p class="text-red-800">
                    The platform acts as an intermediary connecting trainers and trainees. We are
                    not responsible for the quality, safety, or legality of training services
                    provided. Users assume all risks associated with training activities.
                  </p>
                </div>
                <p>
                  Trainers and trainees are independent parties. The platform does not employ
                  trainers and is not responsible for their actions, qualifications, or conduct.
                </p>
                <p>
                  In the event of disputes between trainers and trainees, parties agree to first
                  attempt resolution through our dispute resolution process. The platform may assist
                  in mediation but is not obligated to resolve disputes.
                </p>
                <p>
                  By using the platform, you release the platform, its owners, employees, and
                  affiliates from any claims, damages, or liability arising from your use of the
                  services or interactions with other users.
                </p>
              </div>
            </section>

            <!-- Section 8: Termination -->
            <section id="termination" class="scroll-mt-6">
              <div class="flex items-center gap-3 mb-4">
                <svg
                  class="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h2 class="text-2xl font-bold dark:text-white text-gray-900">8. Termination</h2>
              </div>
              <div class="space-y-4 dark:text-gray-200 text-gray-700">
                <p>
                  We reserve the right to suspend or terminate any account that violates these Terms
                  and Conditions, engages in fraudulent activity, or poses a risk to other users.
                </p>
                <p>
                  Users may terminate their accounts at any time by contacting our support team.
                  Termination does not relieve users of any outstanding payment obligations.
                </p>
                <div class="bg-gray-100 dark:bg-[#292929] rounded-lg p-4">
                  <h3 class="font-semibold dark:text-gray-300 text-gray-900 mb-2">Grounds for Termination:</h3>
                  <p>
                    Accounts may be terminated for violation of terms, fraudulent activity,
                    harassment of other users, provision of false information, non-payment, or any
                    activity that compromises platform integrity or user safety.
                  </p>
                </div>
              </div>
            </section>

            <!-- Contact Section -->
            <section class="border-t pt-8 mt-8">
              <h2 class="text-2xl font-bold dark:text-white text-gray-900 mb-4">Contact Us</h2>
              <div class="bg-blue-50 dark:bg-[#292929] rounded-lg p-6">
                <p class="text-gray-700 dark:text-gray-200 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <div class="space-y-2 dark:text-gray-200 text-gray-700">
                  <p><strong>Email:</strong> legal@trainly.com</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </section>

            <!-- Acceptance Button -->
            <div class="border-t pt-8 mt-8">
              <div class="bg-white dark:bg-[#292929] rounded-lg p-6 text-center">
                <p class="text-gray-800 dark:text-gray-200 font-medium mb-4">
                  By using our platform, you acknowledge that you have read and understood these
                  Terms and Conditions and agree to be bound by them.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-8 mt-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; 2025 Trainer Platform. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeSection: "",
      sections: [
        { id: "acceptance", title: "1. Acceptance of Terms", icon: "check-circle" },
        { id: "definitions", title: "2. Definitions", icon: "file-text" },
        { id: "registration", title: "3. Account Registration", icon: "users" },
        { id: "trainers", title: "4. Trainer Obligations", icon: "award" },
        { id: "trainees", title: "5. Trainee Obligations", icon: "users" },
        { id: "payments", title: "6. Payments and Fees", icon: "credit-card" },
        { id: "liability", title: "7. Liability and Disputes", icon: "alert-circle" },
        { id: "termination", title: "8. Termination", icon: "x-circle" },
      ],
    };
  },
  methods: {
    scrollToSection(sectionId) {
      this.activeSection = sectionId;
      const element = document.getElementById(sectionId);
      if (element) {
        const yOffset = -100; // Offset to account for header
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    },
    acceptTerms() {
      alert("Thank you for accepting the Terms and Conditions!");
      // You can add your logic here to handle the acceptance
    },
    handleScroll() {
      const footer = document.querySelector("footer");
      const sidebar = document.querySelector(".fixed-sidebar");

      if (footer && sidebar) {
        const footerRect = footer.getBoundingClientRect();
        const sidebarRect = sidebar.getBoundingClientRect();

        // If sidebar would overlap footer, hide it
        if (footerRect.top < sidebarRect.bottom) {
          sidebar.style.opacity = "0";
          sidebar.style.pointerEvents = "none";
        } else {
          sidebar.style.opacity = "1";
          sidebar.style.pointerEvents = "auto";
        }
      }
    },
  },
  mounted() {
    // Set up intersection observer to track active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-120px 0px -50% 0px",
      },
    );

    this.sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    // Add scroll listener to handle footer overlap
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll(); // Initial check
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.scroll-mt-6 {
  scroll-margin-top: 1.5rem;
}
</style>
