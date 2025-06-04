"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, FileText, Globe, MoreHorizontal, Wallet } from "lucide-react"

interface Asset {
  id: string
  name: string
  type: "real-estate" | "carbon-credit" | "invoice" | "luxury-good"
  value: number
  status: "verified" | "pending" | "tokenized" | "listed"
  date: string
}

const mockAssets: Asset[] = [
  {
    id: "asset-001",
    name: "Downtown Office Building",
    type: "real-estate",
    value: 1250000,
    status: "tokenized",
    date: "2023-11-15",
  },
  {
    id: "asset-002",
    name: "Carbon Offset Project - Amazon",
    type: "carbon-credit",
    value: 75000,
    status: "verified",
    date: "2023-12-01",
  },
  {
    id: "asset-003",
    name: "Invoice #1234 - Tech Services",
    type: "invoice",
    value: 45000,
    status: "listed",
    date: "2024-01-10",
  },
  {
    id: "asset-004",
    name: "Luxury Watch Collection",
    type: "luxury-good",
    value: 120000,
    status: "pending",
    date: "2024-02-05",
  },
  {
    id: "asset-005",
    name: "Residential Property - Beachfront",
    type: "real-estate",
    value: 3500000,
    status: "tokenized",
    date: "2024-02-20",
  },
  {
    id: "asset-006",
    name: "Wind Farm Carbon Credits",
    type: "carbon-credit",
    value: 250000,
    status: "verified",
    date: "2024-03-01",
  },
  {
    id: "asset-007",
    name: "Invoice #5678 - Construction",
    type: "invoice",
    value: 180000,
    status: "pending",
    date: "2024-03-15",
  },
]

const getAssetIcon = (type: Asset["type"]) => {
  switch (type) {
    case "real-estate":
      return <Building2 className="h-4 w-4" />
    case "carbon-credit":
      return <Globe className="h-4 w-4" />
    case "invoice":
      return <FileText className="h-4 w-4" />
    case "luxury-good":
      return <Wallet className="h-4 w-4" />
  }
}

const getStatusColor = (status: Asset["status"]) => {
  switch (status) {
    case "verified":
      return "bg-blue-500"
    case "pending":
      return "bg-yellow-500"
    case "tokenized":
      return "bg-green-500"
    case "listed":
      return "bg-purple-500"
  }
}

interface AssetsListProps {
  limit?: number
}

export function AssetsList({ limit }: AssetsListProps) {
  const [assets] = useState<Asset[]>(limit ? mockAssets.slice(0, limit) : mockAssets)

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium">
          <div className="col-span-2">Asset</div>
          <div>Value</div>
          <div>Status</div>
          <div className="text-right">Actions</div>
        </div>
        <div className="divide-y">
          {assets.map((asset) => (
            <div key={asset.id} className="grid grid-cols-5 gap-4 p-4 text-sm">
              <div className="col-span-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                  {getAssetIcon(asset.type)}
                </div>
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-xs text-muted-foreground">Added on {asset.date}</div>
                </div>
              </div>
              <div className="flex items-center">${asset.value.toLocaleString()}</div>
              <div className="flex items-center">
                <Badge variant="outline" className="capitalize">
                  <div className={`mr-1 h-2 w-2 rounded-full ${getStatusColor(asset.status)}`} />
                  {asset.status}
                </Badge>
              </div>
              <div className="flex items-center justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={`/assets/${asset.id}`} className="flex w-full">
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Edit Asset</DropdownMenuItem>
                    {asset.status === "verified" && <DropdownMenuItem>Tokenize Asset</DropdownMenuItem>}
                    {asset.status === "tokenized" && <DropdownMenuItem>List on Marketplace</DropdownMenuItem>}
                    {asset.status === "listed" && <DropdownMenuItem>Remove Listing</DropdownMenuItem>}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">Delete Asset</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!limit && (
        <div className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      )}
    </div>
  )
}
