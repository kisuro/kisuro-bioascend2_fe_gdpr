import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowLeft,
  Shield,
  Users,
  FileText,
  AlertTriangle,
  CreditCard,
  Ban,
  Copyright,
  Scale,
  Lock,
  XCircle,
  MessageSquare,
  Mail,
} from "lucide-react"
import { journalFeatureEnabled } from "@/lib/features"

export const metadata: Metadata = {
  title: "Terms of Service | BioAionics",
  description: "Terms of Service for BioAionics - governing your use of our wellness and supplement tracking platform.",
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 dark:from-blue-400/20 dark:to-indigo-400/20">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Terms of Service</h1>
                <p className="text-slate-600 dark:text-slate-400">Effective Date: September 17, 2025</p>
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms of Service govern your use of the BioAionics website, applications, and services. By accessing
              or using our Service, you agree to these Terms.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Eligibility */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                <Users className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">1. Eligibility</h2>
            </div>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>• You must be at least 16 years old to use our Service.</li>
              <li>• By using BioAionics, you represent that you have the legal capacity to enter into these Terms.</li>
            </ul>
          </section>

          {/* Informational Nature */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                2. Informational Nature of the Service
              </h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <ul className="space-y-3">
                <li>• BioAionics provides educational and informational resources only.</li>
                <li>
                  • The content on supplements, "stacks," wellness tracking
                  {journalFeatureEnabled ? ", journaling," : ","} AudioMind, and AI recommendations is not medical
                  advice.
                </li>
                <li>• We are not doctors, pharmacists, or healthcare providers.</li>
                <li>
                  • Always consult a qualified healthcare professional before making any decisions regarding
                  supplements, medications, or lifestyle changes.
                </li>
              </ul>
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/30">
                <p className="font-medium text-amber-800 dark:text-amber-200">
                  ⚠️ Important: Any reliance on information from BioAionics is at your own risk.
                </p>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">3. User Accounts</h2>
            </div>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>
                • To access certain features (e.g., reviews{journalFeatureEnabled ? ", journaling" : ""}, premium
                content), you may need to create an account.
              </li>
              <li>• You are responsible for maintaining the confidentiality of your credentials.</li>
              <li>• You agree not to share your account or allow unauthorized access.</li>
              <li>• We may suspend or terminate accounts that violate these Terms.</li>
            </ul>
          </section>

          {/* User-Generated Content */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">4. User-Generated Content</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                You may contribute reviews, supplement logs, stacks{journalFeatureEnabled ? ", journaling entries," : ","}
                or other materials ("Content").
                By submitting Content, you agree that:
              </p>
              <ul className="space-y-3">
                <li>
                  • You retain ownership of your Content, but you grant BioAionics a non-exclusive, royalty-free,
                  worldwide license to use, display, and distribute it within the Service.
                </li>
                <li>• You will not post false, misleading, harmful, or illegal information.</li>
                <li>
                  • You are solely responsible for your Content, including supplement combinations ("stacks") you share.
                </li>
              </ul>
              <p>We reserve the right to remove any Content that violates these Terms or our policies.</p>
            </div>
          </section>

          {/* Premium Services */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">5. Premium Services</h2>
            </div>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>
                • Certain features (e.g., advanced supplement insights, AI assistant, AudioMind library) require a paid
                subscription.
              </li>
              <li>• Payments are processed securely through third-party providers.</li>
              <li>• Subscriptions renew automatically unless canceled in advance.</li>
              <li>• No refunds are provided except as required by applicable law.</li>
            </ul>
          </section>

          {/* Prohibited Activities */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20">
                <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">6. Prohibited Activities</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>You agree not to:</p>
              <ul className="space-y-3">
                <li>• Misuse the Service for unlawful purposes.</li>
                <li>• Share or promote medical misinformation.</li>
                <li>• Upload harmful code, attempt to hack, or disrupt the platform.</li>
                <li>• Sell, rent, or exploit the Service for unauthorized commercial purposes.</li>
              </ul>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20">
                <Copyright className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">7. Intellectual Property</h2>
            </div>
            <ul className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed">
              <li>
                • All platform content (design, code, logos, supplement database) is owned by BioAionics unless
                otherwise stated.
              </li>
              <li>• You may use the Service for personal, non-commercial purposes only.</li>
              <li>• Unauthorized reproduction or distribution of our content is prohibited.</li>
            </ul>
          </section>

          {/* Disclaimer of Warranties */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20">
                <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">8. Disclaimer of Warranties</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>The Service is provided "as is" and "as available" without warranties of any kind.</p>
              <ul className="space-y-3">
                <li>
                  • We do not guarantee the accuracy, completeness, or safety of supplement information or stacks.
                </li>
                <li>
                  • We disclaim responsibility for outcomes related to supplement use, health tracking, or lifestyle
                  choices made through the Service.
                </li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-slate-500/20 to-gray-500/20">
                <Scale className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">9. Limitation of Liability</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>To the fullest extent permitted by law:</p>
              <ul className="space-y-3">
                <li>
                  • BioAionics and its affiliates shall not be liable for any direct, indirect, incidental, or
                  consequential damages arising from your use of the Service.
                </li>
                <li>
                  • This includes damages related to supplement choices, health decisions, or reliance on AI-generated
                  content.
                </li>
              </ul>
            </div>
          </section>

          {/* Privacy */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20">
                <Lock className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">10. Privacy</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Our collection and use of personal data is governed by our{" "}
              <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Termination */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">11. Termination</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>We may suspend or terminate your access if you:</p>
              <ul className="space-y-3">
                <li>• Violate these Terms,</li>
                <li>• Misuse the Service, or</li>
                <li>• Engage in unlawful or harmful conduct.</li>
              </ul>
              <p>You may stop using the Service at any time.</p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
                <Scale className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">12. Governing Law</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
              BioAionics operates, without regard to conflict of law principles.
            </p>
          </section>

          {/* Changes to Terms */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
                <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">13. Changes to Terms</h2>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              We may update these Terms from time to time. Changes will be effective upon posting on this page.
              Continued use of the Service means you accept the updated Terms.
            </p>
          </section>

          {/* Contact */}
          <section className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 rounded-3xl p-8 border border-white/20 dark:border-slate-700/30 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/20 to-blue-500/20">
                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">14. Contact Us</h2>
            </div>
            <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>If you have questions about these Terms, contact us:</p>
              <div className="space-y-2">
                <p>
                  <strong>BioAionics Legal Team</strong>
                </p>
                <p>
                  Email:{" "}
                  <a href="mailto:legal@bioaionics.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    legal@bioaionics.com
                  </a>
                </p>
                <p>
                  Website:{" "}
                  <a href="https://www.bioaionics.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    https://www.bioaionics.com
                  </a>
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 rounded-2xl p-6 border border-white/20 dark:border-slate-700/30">
            <p className="text-sm text-slate-600 dark:text-slate-400">Last updated: September 17, 2025 • BioAionics</p>
          </div>
        </div>
      </div>
    </div>
  )
}
