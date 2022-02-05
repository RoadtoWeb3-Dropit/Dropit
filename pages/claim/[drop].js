import { useRouter } from "next/router"
import Link from "next/link"

export default function Home() {
  const router = useRouter()
  const { drop } = router.query
  
  return (
    <div>
      <h1>Claim your drop for {drop}</h1>
      <Link href="/">Home</Link>
    </div>
  )
}
