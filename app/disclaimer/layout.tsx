import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Full Disclaimer - BioAionics",
  description: "Important legal and safety information regarding the use of BioAionics platform and services.",
}

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
