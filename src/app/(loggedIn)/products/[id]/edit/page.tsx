import PageInner from "./_components/PageInner"

const Page = ({ params }: { params: Promise<{ id: string }> }) => (
  <PageInner params={params} />
)
export default Page

// import productApiRequest from "@/apiRequest/product"

// export default async function Page({
//   params
// }: {
//   params: Promise<{ id: string }>
// }) {
//   try {
//     const resolvedParams = await params // Await the params Promise
//     const { payload } = await productApiRequest.getProductById(
//       resolvedParams.id
//     )

//     if (!payload?.data) {
//       return <div className="text-red-500">Product not found</div>
//     }

//     const productDetail = payload.data

//     return (
//       <div>
//         <h1 className="text-2xl mb-4 font-bold">Product Detail</h1>
//         <div className="border p-4">
//           <h2 className="text-xl font-semibold">{productDetail.name}</h2>
//           <p>{productDetail.description}</p>
//           <p className="font-bold">${productDetail.price}</p>
//         </div>
//       </div>
//     )
//   } catch (error) {
//     console.error("Error fetching product details:", error)
//     return <div className="text-red-500">Error fetching product details</div>
//   }
// }
