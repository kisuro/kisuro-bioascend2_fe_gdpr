import { Metadata } from "next"

export const metadata: Metadata = {
  title: "BioAionics Privacy Policy",
  description: "Learn how BioAionics collects, uses, and protects your personal information on our wellness intelligence platform.",
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}