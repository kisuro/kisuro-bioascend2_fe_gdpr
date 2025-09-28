"use client"
import { motion } from "framer-motion"
import { ArrowLeft, Shield, Lock, Eye, Users, Globe, Clock, Mail, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { journalFeatureEnabled } from "@/lib/features"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <motion.div
          className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-heading font-semibold text-lg">BioAionics</span>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="relative">
                <Shield className="w-8 h-8 text-primary" />
                <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Effective Date: September 17, 2025 • Website: https://www.bioaionics.com
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative z-10 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-8 md:p-12 space-y-12">
              {/* Introduction */}
              <div className="space-y-6">
                <p className="text-lg leading-relaxed">
                  At BioAionics, your privacy and trust are our top priority. This Privacy Policy explains how we
                  collect, use, store, and protect your personal information when you use our website, services, and
                  applications. By using our platform, you agree to the practices described in this Policy.
                </p>

                <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Disclaimer:</strong> BioAionics does not provide medical advice, diagnosis, or treatment.
                      All content, including supplement data, user reviews, personal "stacks"
                      {journalFeatureEnabled ? ", journaling entries," : ","} and AI recommendations, is provided for
                      informational and educational purposes only. Always consult with a qualified healthcare
                      professional before making any decisions regarding your health, supplements, or treatments.
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 1: Information We Collect */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">1. Information We Collect</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  We may collect the following types of information when you interact with our website or services:
                </p>

                <div className="space-y-6 ml-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">a) Personal Information</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>
                        • Name, email address, and contact details (when registering, subscribing, or contacting
                        support).
                      </li>
                      <li>• Account credentials (if applicable).</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">b) Usage Data</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Pages you visit, features you interact with, time spent on the platform.</li>
                      <li>• Device, browser, and operating system information.</li>
                      <li>• IP address and approximate location.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">c) Health & Wellness Data (User-Provided)</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Supplements you log or review, including personal "stacks."</li>
                      <li>• Goals, benefits, categories, and timing information you choose to track.</li>
                      <li>• Biorhythm data{journalFeatureEnabled ? " and journaling entries" : ""}, if you use these features.</li>
                    </ul>
                    <div className="mt-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>👉 Important:</strong> These health-related inputs are optional, voluntary, and entirely
                        under your control. BioAionics does not verify the accuracy of supplement use, dosage, or
                        reported effects.
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">d) Cookies & Tracking Technologies</h3>
                    <p className="text-muted-foreground">
                      We use cookies and similar tools for authentication, analytics, personalization, and performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2: How We Use Your Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">2. How We Use Your Information</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">We use the collected information to:</p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li>
                    • Provide and improve our services (supplement database, reviews, biorhythms
                    {journalFeatureEnabled ? ", journaling," : ","} AudioMind, AI assistant).
                  </li>
                  <li>• Enable personalization of your wellness tracking and supplement stacks.</li>
                  <li>• Offer insights and content for educational purposes.</li>
                  <li>• Communicate with you about updates, premium features, or support.</li>
                  <li>• Maintain security, prevent fraud, and ensure compliance.</li>
                </ul>

                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-green-800 dark:text-green-200">
                      <strong>Important:</strong> We do not use your health & wellness data for advertising, profiling,
                      or selling to third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3: Data Storage & Security */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">3. Data Storage & Security</h2>
                </div>

                <ul className="space-y-2 text-muted-foreground">
                  <li>• Data is stored securely using trusted providers (Supabase, Vercel, Render).</li>
                  <li>• Encryption is applied in transit (HTTPS/TLS) and at rest where applicable.</li>
                  <li>• Access to sensitive information is restricted to authorized personnel.</li>
                  <li>
                    • Despite safeguards, no system is 100% secure, and you acknowledge risks of internet-based data
                    transmission.
                  </li>
                </ul>
              </div>

              {/* Section 4: Sharing of Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">4. Sharing of Information</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  We may share information only in the following cases:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li>
                    • <strong>Service Providers:</strong> Hosting, analytics, email delivery, and technical support.
                  </li>
                  <li>
                    • <strong>Legal Compliance:</strong> If required by law or regulation.
                  </li>
                  <li>
                    • <strong>Business Transfers:</strong> In case of merger, acquisition, or restructuring.
                  </li>
                </ul>

                <p className="font-semibold text-foreground">
                  We do not sell, rent, or trade your supplement, stack, or health data.
                </p>
              </div>

              {/* Section 5: Your Rights */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">5. Your Rights</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">You may have the right to:</p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li>• Access the personal data we hold about you.</li>
                  <li>• Request correction or deletion of your data (including supplement logs or stacks).</li>
                  <li>• Restrict or object to processing.</li>
                  <li>• Export your data (data portability).</li>
                  <li>• Withdraw consent at any time.</li>
                </ul>

                <p className="text-muted-foreground">
                  Contact us at:{" "}
                  <a href="mailto:privacy@bioaionics.com" className="text-primary hover:underline">
                    privacy@bioaionics.com
                  </a>
                </p>
              </div>

              {/* Section 6: Children's Privacy */}
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold">6. Children's Privacy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our services are not directed to children under 16. We do not knowingly collect personal information
                  from minors. If you believe your child provided us with data, please contact us to delete it.
                </p>
              </div>

              {/* Section 7: Health & Supplement Disclaimer */}
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold">7. Health & Supplement Disclaimer</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• BioAionics is an informational platform only.</li>
                  <li>
                    • We do not guarantee the accuracy, completeness, or reliability of supplement reviews, dosages, or
                    stacks.
                  </li>
                  <li>• Any reliance on information provided through BioAionics is at your own risk.</li>
                  <li>
                    • Always consult a licensed healthcare professional before starting, stopping, or combining any
                    dietary supplement.
                  </li>
                </ul>
              </div>

              {/* Section 8: International Data Transfers */}
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold">8. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As BioAionics operates globally, your information may be transferred and processed outside your
                  country. We ensure appropriate safeguards (e.g., standard contractual clauses) are in place.
                </p>
              </div>

              {/* Section 9: Retention Policy */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">9. Retention Policy</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  We keep your data only as long as necessary for:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-6">
                  <li>• Service provision and improvement.</li>
                  <li>• Legal compliance.</li>
                  <li>• Your active account usage.</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  When no longer needed, we securely delete or anonymize your data.
                </p>
              </div>

              {/* Section 10: Changes to this Policy */}
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-bold">10. Changes to this Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Changes will be posted on this page with a
                  revised Effective Date.
                </p>
              </div>

              {/* Section 11: Contact Us */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">11. Contact Us</h2>
                </div>

                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>BioAionics Privacy Team</strong>
                  </p>
                  <p>
                    Email:{" "}
                    <a href="mailto:privacy@bioaionics.com" className="text-primary hover:underline">
                      privacy@bioaionics.com
                    </a>
                  </p>
                  <p>
                    Website:{" "}
                    <a href="https://www.bioaionics.com" className="text-primary hover:underline">
                      https://www.bioaionics.com
                    </a>
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />
          <p className="text-sm text-muted-foreground">© BioAionics • Last updated: September 17, 2025</p>
        </div>
      </footer>
    </div>
  )
}
