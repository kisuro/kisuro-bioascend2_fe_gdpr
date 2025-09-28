"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { GlassCard } from "@/components/ui/glass-card"
import {
  AlertTriangle,
  Brain,
  Shield,
  Headphones,
  Database,
  Mail,
  ExternalLink,
  ArrowLeft,
} from "lucide-react"

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading text-foreground">
            Full Disclaimer
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Important legal and safety information regarding the use of BioAionics platform and services.
          </p>
        </motion.div>

        {/* Medical Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard variant="strong" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="h-6 w-6 text-red-500 mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">Medical Disclaimers</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">FDA Statements About Supplements</h3>
                <p className="leading-relaxed">
                  The statements regarding dietary supplements have not been evaluated by the Food and Drug Administration (FDA). 
                  These products are not intended to diagnose, treat, cure, or prevent any disease. The information provided 
                  is for educational purposes only and should not replace professional medical advice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Drug Interaction Warnings</h3>
                <p className="leading-relaxed">
                  Dietary supplements may interact with prescription medications, over-the-counter drugs, and other supplements. 
                  Some interactions can be serious or life-threatening. Always consult with your healthcare provider before 
                  starting any supplement regimen, especially if you are taking medications or have underlying health conditions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Individual Variation Notices</h3>
                <p className="leading-relaxed">
                  Individual responses to supplements and wellness practices vary significantly. Factors including genetics, 
                  age, health status, lifestyle, and other medications can affect how your body responds to supplements. 
                  What works for one person may not work for another, and effects may vary over time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Professional Consultation Requirements</h3>
                <p className="leading-relaxed">
                  Always consult with qualified healthcare professionals before making any decisions about your health. 
                  This includes licensed physicians, registered dietitians, pharmacists, and other appropriate healthcare 
                  providers. Never disregard professional medical advice or delay seeking treatment because of information 
                  found on this platform.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI System Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <GlassCard variant="strong" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <Brain className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">AI System Disclaimers</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">AI Limitations and Accuracy</h3>
                <p className="leading-relaxed">
                  Our AI systems provide general information based on available data and patterns. AI responses may contain 
                  errors, inaccuracies, or outdated information. The technology is continuously evolving, but it is not 
                  infallible. Always verify important information with authoritative sources and qualified professionals.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Educational vs Medical Distinction</h3>
                <p className="leading-relaxed">
                  All AI-generated content is for educational and informational purposes only. It does not constitute 
                  medical advice, diagnosis, or treatment recommendations. The AI system is not a substitute for professional 
                  medical consultation and cannot provide personalized medical guidance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">No Personalized Medical Advice</h3>
                <p className="leading-relaxed">
                  Our AI does not provide personalized medical advice tailored to your specific health condition, medical 
                  history, or individual circumstances. Any suggestions or information provided are general in nature and 
                  should not be applied to your specific situation without professional medical guidance.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">General Information Only</h3>
                <p className="leading-relaxed">
                  All content generated by our AI systems represents general information that may be applicable to a broad 
                  population but may not be appropriate for your individual needs, health status, or circumstances. Use this 
                  information as a starting point for discussions with qualified healthcare professionals.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Biorhythm Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-8"
        >
          <GlassCard variant="strong" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <Shield className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">Biorhythm Disclaimers</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Entertainment and Educational Purpose</h3>
                <p className="leading-relaxed">
                  Biorhythm calculations and visualizations are provided for entertainment and educational purposes only. 
                  They are based on traditional biorhythm theory and mathematical calculations, not scientific medical 
                  research or evidence-based health practices.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">No Scientific Medical Basis Claims</h3>
                <p className="leading-relaxed">
                  We do not claim that biorhythm calculations have scientific medical validity or can predict health 
                  outcomes, performance, or life events. The scientific community does not recognize biorhythms as having 
                  predictive medical or health value. Use these tools for self-reflection and personal interest only.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Personal Tracking Tool Only</h3>
                <p className="leading-relaxed">
                  Biorhythm features are designed as personal tracking and visualization tools. They may help you reflect 
                  on patterns and cycles in your life, but should not be used to make important decisions about health, 
                  relationships, career, or other significant life matters.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Not Diagnostic or Predictive</h3>
                <p className="leading-relaxed">
                  Biorhythm calculations are not diagnostic tools and cannot predict future health conditions, performance 
                  levels, or life events. Do not use biorhythm information to diagnose health conditions, make medical 
                  decisions, or predict outcomes that could affect your health or safety.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Audio Content Disclaimers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <GlassCard variant="strong" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <Headphones className="h-6 w-6 text-tertiary mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">Audio Content Disclaimers</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Relaxation and Focus Purposes</h3>
                <p className="leading-relaxed">
                  Audio content including meditation tracks, binaural beats, and relaxation sounds are provided for 
                  relaxation, focus, and general wellness purposes only. These are not medical treatments or therapeutic 
                  interventions designed to treat specific health conditions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Not Therapy or Medical Treatment</h3>
                <p className="leading-relaxed">
                  Audio content is not a substitute for professional therapy, medical treatment, or mental health services. 
                  If you are experiencing mental health issues, depression, anxiety, or other health conditions, please 
                  consult with qualified healthcare professionals or mental health providers.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Individual Results May Vary</h3>
                <p className="leading-relaxed">
                  The effectiveness of audio content for relaxation, focus, or meditation varies greatly among individuals. 
                  Some people may experience significant benefits, while others may experience minimal or no effects. 
                  Personal preferences, hearing sensitivity, and individual circumstances all affect outcomes.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Volume and Usage Safety</h3>
                <p className="leading-relaxed">
                  Always use audio content at safe volume levels to protect your hearing. Do not use audio content while 
                  driving, operating machinery, or engaging in activities that require full attention. Some audio content 
                  may cause drowsiness or altered states of consciousness. If you experience seizures, hearing problems, 
                  or other adverse effects, discontinue use immediately and consult a healthcare provider.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* GDPR Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-8"
        >
          <GlassCard variant="strong" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <Database className="h-6 w-6 text-quaternary mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">GDPR Compliance & Data Protection</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Data Processing Purposes</h3>
                <p className="leading-relaxed">
                  We process personal data for the following purposes: providing platform services, user authentication, 
                  service improvement, communication with users, and legal compliance. All data processing is based on 
                  lawful grounds as defined by GDPR, including consent, legitimate interests, and contractual necessity.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">User Rights Information</h3>
                <p className="leading-relaxed">
                  Under GDPR, you have the right to access, rectify, erase, restrict processing, data portability, and 
                  object to processing of your personal data. You also have the right to withdraw consent at any time 
                  and lodge a complaint with supervisory authorities. For detailed information about your rights, please 
                  see our <Link href="/privacy-policy" className="text-primary hover:text-primary/80 underline">Privacy Policy</Link>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Consent Mechanisms</h3>
                <p className="leading-relaxed">
                  We obtain explicit consent for data processing where required by law. Consent is freely given, specific, 
                  informed, and can be withdrawn at any time. We use clear consent mechanisms and provide detailed 
                  information about data processing activities. Cookie consent and other permissions are managed through 
                  our platform interfaces.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-8"
        >
          <GlassCard variant="strong" className="p-8 rounded-2xl">
            <div className="flex items-start gap-4 mb-6">
              <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
              <h2 className="text-2xl font-bold text-foreground">Contact Information</h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">Privacy Inquiries</h3>
                <p className="leading-relaxed">
                  For questions about data processing, privacy rights, or GDPR compliance, please contact our privacy team:
                </p>
                <a 
                  href="mailto:privacy@bioaionics.com" 
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mt-2"
                >
                  privacy@bioaionics.com
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-3">General Support</h3>
                <p className="leading-relaxed">
                  For general platform support, technical issues, or other inquiries not related to privacy, please use 
                  our standard support channels available through the platform.
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 px-4 py-2 rounded-full">
            Last updated: September 28, 2025
          </div>
        </motion.div>

        {/* Footer Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-border/30"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
