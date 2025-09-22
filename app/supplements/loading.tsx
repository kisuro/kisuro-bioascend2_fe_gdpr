import { AppLoader } from "@/components/ui/app-loader"

export default function Loading() {
  return <AppLoader isVisible={true} message="Loading supplements database..." />
}
