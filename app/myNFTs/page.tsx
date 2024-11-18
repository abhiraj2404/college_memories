"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Search, Grid, List, LayoutGrid, Settings } from "lucide-react";
import { Avatar } from "@nextui-org/avatar";
import { useActiveAccount } from "thirdweb/react";

const mockNFTs = [
  {
    id: 1,
    name: "Senior Memories #001",
    description: "Graduation ceremony moments captured forever",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 2,
    name: "College Days #042",
    description: "Last day in the campus library",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    id: 3,
    name: "Farewell Party #013",
    description: "Group photo with classmates",
    image: "/placeholder.svg?height=400&width=400",
  },
  // Add more NFTs as needed
];

function myCollections() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const address = useActiveAccount()?.address;

  const filteredNFTs = mockNFTs.filter((nft) =>
    nft.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-8">
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar
          src="/placeholder.svg?height=100&width=100"
          className="w-24 h-24"
        />
        <div>
          <h1 className="text-2xl font-bold">Unnamed</h1>
          <p className="text-default-500 font-mono">{address}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between items-start sm:items-center">
        <Input
          placeholder="Search your NFTs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startContent={<Search className="text-default-400" size={20} />}
          className="w-full sm:w-[400px]"
        />
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "solid" : "flat"}
            isIconOnly
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid size={20} />
          </Button>
          <Button
            variant={viewMode === "list" ? "solid" : "flat"}
            isIconOnly
            onClick={() => setViewMode("list")}
          >
            <List size={20} />
          </Button>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="flat">
                <Settings size={20} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="View options">
              <DropdownItem>Sort by Name</DropdownItem>
              <DropdownItem>Sort by Recent</DropdownItem>
              <DropdownItem>Filter by Collection</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* NFT Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1"
        }`}
      >
        {filteredNFTs.map((nft) => (
          <Card
            key={nft.id}
            className="hover:scale-105 transition-transform"
            isPressable
          >
            <CardBody className="p-0">
              <img
                src={nft.image}
                alt={nft.name}
                className={`w-full ${viewMode === "grid" ? "h-[300px]" : "h-[200px]"} object-cover`}
              />
            </CardBody>
            <CardFooter className="flex flex-col items-start">
              <h3 className="text-lg font-semibold">{nft.name}</h3>
              <p className="text-default-500">{nft.description}</p>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredNFTs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-default-500">
            No NFTs found matching your search.
          </p>
        </div>
      )}
    </div>
  );
}

export default myCollections;