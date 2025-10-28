import { getProductById } from "@/lib/api"
import { Header } from "@/components/header"
import { ProductDetailClient } from "./product-detail-client"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <>
      <Header />
      <ProductDetailClient product={product} />
    </>
  )
}
