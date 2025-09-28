"use client"
import { motion } from "framer-motion"
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  Globe, 
  Clock, 
  Mail, 
  AlertTriangle, 
  Database,
  UserCheck,
  FileText,
  Brain,
  Heart,
  Headphones,
  CreditCard,
  Bell,
  Zap,
  Gavel,
  Baby
} from "lucide-react"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"

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
                BioAionics Privacy Policy
              </h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Effective Date: September 28, 2025 • Last Updated: September 28, 2025
            </p>
            <p className="text-muted-foreground mt-2">
              At BioAionics, your privacy is our top priority. This Privacy Policy explains how we collect, use, store, and protect your information when you use our wellness intelligence platform.
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
              
              {/* Important Disclaimers */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
                  <h2 className="font-heading text-2xl font-bold">Important Disclaimers</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-amber-800 dark:text-amber-200">
                      <strong>Educational Platform:</strong> BioAionics provides educational information about wellness, supplements, biorhythms, and meditation for informational purposes only. This is not medical advice, diagnosis, or treatment.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>AI Guidance:</strong> Our AI system provides general educational guidance based on research. Not personalized medical recommendations.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Always Consult Professionals:</strong> Consult qualified healthcare professionals before making any health or supplement decisions.
                    </p>
                  </div>
                </div>
              </div>
              {/* Section 1: Information We Collect */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">1. Information We Collect</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <UserCheck className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-lg">a) Account Information (Required for Premium Features)</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Email address (for account access and service communications)</li>
                      <li>• Account credentials (securely hashed passwords)</li>
                      <li>• Subscription status and payment information (processed by Stripe)</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-lg">b) Usage Analytics (Anonymous)</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Pages visited and features used</li>
                      <li>• Device and browser information</li>
                      <li>• IP address (for security and approximate location)</li>
                      <li>• Session duration and interaction patterns</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-lg">c) Educational Interactions (Not Stored)</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• AI Assistant: Questions and responses are processed but not saved to your profile</li>
                      <li>• Biorhythm Calculations: Performed locally in your browser, not stored on our servers</li>
                      <li>• Supplement Research: Viewing history not linked to personal profiles</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-lg">d) Technical Data</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Cookies for authentication, preferences, and site functionality</li>
                      <li>• Performance and error monitoring data</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 2: What We DO NOT Collect */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-500" />
                  <h2 className="font-heading text-2xl font-bold">2. What We DO NOT Collect</h2>
                </div>
                
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                  <ul className="space-y-2 text-green-800 dark:text-green-200">
                    <li>• <strong>No Personal Health Records:</strong> We don't store medical history, conditions, or diagnoses</li>
                    <li>• <strong>No Supplement Tracking:</strong> We don't save what supplements you take or personal "stacks"</li>
                    <li>• <strong>No Health Monitoring:</strong> We don't track personal health metrics or outcomes</li>
                    <li>• <strong>No Personal Reviews:</strong> We don't collect user reviews about supplement effects</li>
                  </ul>
                </div>
              </div>

              {/* Section 3: Legal Basis for Processing (GDPR) */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Gavel className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">3. Legal Basis for Processing (GDPR)</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">We process your data based on:</p>
                <ul className="space-y-3 text-muted-foreground ml-6">
                  <li>• <strong>Contract Performance:</strong> To provide premium features you've subscribed to</li>
                  <li>• <strong>Legitimate Interest:</strong> For service improvement, security, and analytics</li>
                  <li>• <strong>Consent:</strong> For optional communications and newsletters (you can opt-out anytime)</li>
                </ul>
              </div>

              {/* Section 4: How We Use Your Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">4. How We Use Your Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <UserCheck className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-lg">Account Management</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Provide access to premium features (advanced biorhythms, complete supplement database, audio library)</li>
                      <li>• Process subscription payments (via Stripe)</li>
                      <li>• Send important service notifications</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Heart className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-lg">Service Improvement</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Analyze usage patterns to improve our platform (anonymized data only)</li>
                      <li>• Ensure security and prevent abuse</li>
                      <li>• Optimize website performance</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Bell className="w-5 h-5 text-accent" />
                      <h3 className="font-semibold text-lg">Educational Communications (Optional)</h3>
                    </div>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Newsletter with wellness articles and platform updates</li>
                      <li>• New feature announcements</li>
                      <li>• You can unsubscribe anytime</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 5: Information Sharing */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">5. Information Sharing</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">We share information only in these limited cases:</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Service Providers (Data Processors)</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• <strong>Hosting:</strong> Supabase (EU servers for EU users), Vercel</li>
                      <li>• <strong>Payments:</strong> Stripe (they handle all payment data)</li>
                      <li>• <strong>Analytics:</strong> Anonymous usage statistics only</li>
                      <li>• <strong>Email:</strong> Service notifications and optional newsletters</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Legal Requirements</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• When required by applicable law or regulation</li>
                      <li>• To protect our rights, users, or public safety</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Business Transfers</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• In case of merger, acquisition, or asset sale (with same privacy protections)</li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800">
                  <p className="text-sm text-red-800 dark:text-red-200 font-semibold">
                    We NEVER sell, rent, or trade your personal information.
                  </p>
                </div>
              </div>

              {/* Section 6: Data Security */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">6. Data Security</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Technical Safeguards</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• <strong>Encryption:</strong> All data encrypted in transit (HTTPS/TLS) and at rest</li>
                      <li>• <strong>Access Control:</strong> Strict access limits to personal data</li>
                      <li>• <strong>Secure Hosting:</strong> EU-based servers for EU users</li>
                      <li>• <strong>Regular Updates:</strong> Security patches and monitoring</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Limitations</h3>
                    <p className="text-muted-foreground ml-6">
                      No system is 100% secure. We implement industry-standard protections, but you acknowledge the inherent risks of internet-based services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 7: Your Privacy Rights */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">7. Your Privacy Rights</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">All Users</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• <strong>Access:</strong> Request a copy of your personal data</li>
                      <li>• <strong>Correction:</strong> Update incorrect information</li>
                      <li>• <strong>Deletion:</strong> Delete your account and associated data</li>
                      <li>• <strong>Export:</strong> Download your data in portable format</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">EU/UK Users (Additional GDPR Rights)</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• <strong>Restrict Processing:</strong> Limit how we use your data</li>
                      <li>• <strong>Object:</strong> Object to processing based on legitimate interests</li>
                      <li>• <strong>Withdraw Consent:</strong> For optional features and communications</li>
                      <li>• <strong>Lodge Complaints:</strong> With your local data protection authority</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-3">How to Exercise Rights</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• <strong>Account Settings:</strong> Manage preferences and data directly</li>
                      <li>• <strong>Email:</strong> Contact privacy@bioaionics.com</li>
                      <li>• <strong>Response Time:</strong> We respond within 30 days</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 8: Data Retention */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">8. Data Retention</h2>
                </div>

                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Active Accounts:</strong> Data kept while account is active and for service provision</li>
                  <li>• <strong>Cancelled Accounts:</strong> Personal data deleted within 30 days of cancellation</li>
                  <li>• <strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
                  <li>• <strong>Analytics Data:</strong> Anonymous usage data kept for service improvement</li>
                </ul>
              </div>

              {/* Section 9: International Transfers */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">9. International Transfers</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">EU Users</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Data processed and stored within the EU where possible</li>
                      <li>• Any transfers outside EU protected by appropriate safeguards (Standard Contractual Clauses)</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Non-EU Users</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Data may be processed in various countries where our service providers operate</li>
                      <li>• All transfers protected by appropriate security measures</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 10: Children's Privacy */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Baby className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">10. Children's Privacy</h2>
                </div>

                <ul className="space-y-2 text-muted-foreground">
                  <li>• Our services are intended for users 16 and older</li>
                  <li>• We don't knowingly collect data from children under 16</li>
                  <li>• If you believe a child has provided us with data, contact us immediately for deletion</li>
                </ul>
              </div>

              {/* Section 11: Cookies and Tracking */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">11. Cookies and Tracking</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Essential Cookies</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Account authentication and security</li>
                      <li>• Site functionality and preferences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Analytics Cookies</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Anonymous usage statistics</li>
                      <li>• Performance monitoring</li>
                      <li>• You can disable these in your browser settings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">No Advertising Cookies</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• We don't use cookies for advertising or behavioral tracking</li>
                      <li>• No third-party advertising networks</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 12: Third-Party Services */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">12. Third-Party Services</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Payment Processing</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• <strong>Stripe:</strong> Handles all payment data according to their privacy policy</li>
                      <li>• We never see or store your full payment information</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Educational Content</h3>
                    <ul className="space-y-2 text-muted-foreground ml-6">
                      <li>• Links to supplement retailers (affiliate links clearly marked)</li>
                      <li>• External research sources and studies</li>
                      <li>• These sites have their own privacy policies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 13: Changes to This Policy */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">13. Changes to This Policy</h2>
                </div>

                <ul className="space-y-2 text-muted-foreground">
                  <li>• We may update this policy to reflect service changes or legal requirements</li>
                  <li>• Significant changes will be announced via email or platform notification</li>
                  <li>• Continued use after changes constitutes acceptance</li>
                  <li>• Check this page periodically for updates</li>
                </ul>
              </div>

              {/* Section 14: Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">14. Contact Information</h2>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Privacy Questions</h3>
                    <div className="text-muted-foreground ml-6">
                      <p>Email: <a href="mailto:privacy@bioaionics.com" className="text-primary hover:underline">privacy@bioaionics.com</a></p>
                      <p>Response Time: Within 3 business days</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Data Protection Officer (EU)</h3>
                    <div className="text-muted-foreground ml-6">
                      <p>Email: <a href="mailto:dpo@bioaionics.com" className="text-primary hover:underline">dpo@bioaionics.com</a></p>
                      <p>For: GDPR-specific questions and complaints</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">General Support</h3>
                    <div className="text-muted-foreground ml-6">
                      <p>Email: <a href="mailto:support@bioaionics.com" className="text-primary hover:underline">support@bioaionics.com</a></p>
                      <p>Website: <a href="https://www.bioaionics.com" className="text-primary hover:underline">https://www.bioaionics.com</a></p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">Supervisory Authority (EU Users)</h3>
                    <p className="text-muted-foreground ml-6">
                      You have the right to lodge a complaint with your local data protection authority if you believe your privacy rights have been violated.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 15: Jurisdiction */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Gavel className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-2xl font-bold">15. Jurisdiction</h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  This Privacy Policy is governed by applicable law and EU data protection law where applicable.
                </p>
              </div>

              {/* Final Statement */}
              <div className="space-y-6">
                <div className="p-6 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-foreground font-medium text-center">
                    By using BioAionics, you acknowledge that you have read, understood, and agree to this Privacy Policy.
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
          <p className="text-sm text-muted-foreground">© BioAionics • Last updated: September 28, 2025</p>
        </div>
      </footer>
    </div>
  )
}
