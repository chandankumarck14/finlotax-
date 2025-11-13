import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  UserPlus,
  Edit,
  FileText,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MinusCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

// Generate client data - exactly 8 clients
const generateClientsData = () => {
  const clients = [
    {
      id: 1,
      name: "Kiran Pasula",
      email: "kiranpasula@gmail.com",
      branch: "Sunnyvale-USA",
      phone: "+1(408) 555-9876",
      manager: "Prachi Babu",
      employee: "Ramya",
      isActive: true,
    },
    {
      id: 2,
      name: "Sudhakar Narayanappa",
      email: "sudhakar.n@gmail.com",
      branch: "Bangalore-India",
      phone: "+91 98765 43210",
      manager: "Rajashree Pawar",
      employee: "Amit Kumar",
      isActive: true,
    },
    {
      id: 3,
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      branch: "Mumbai-India",
      phone: "+91 99887 76543",
      manager: "Vikram Singh",
      employee: "Neha Gupta",
      isActive: false,
    },
    {
      id: 4,
      name: "John Anderson",
      email: "john.anderson@gmail.com",
      branch: "New York-USA",
      phone: "+1(212) 555-1234",
      manager: "Sarah Johnson",
      employee: "Michael Brown",
      isActive: true,
    },
    {
      id: 5,
      name: "Emily Chen",
      email: "emily.chen@gmail.com",
      branch: "San Francisco-USA",
      phone: "+1(650) 555-4567",
      manager: "David Wong",
      employee: "Lisa Martinez",
      isActive: true,
    },
    {
      id: 6,
      name: "Rajesh Patel",
      email: "rajesh.patel@gmail.com",
      branch: "Delhi-India",
      phone: "+91 98456 78901",
      manager: "Anita Desai",
      employee: "Suresh Kumar",
      isActive: true,
    },
    {
      id: 7,
      name: "Maria Rodriguez",
      email: "maria.rodriguez@gmail.com",
      branch: "Miami-USA",
      phone: "+1(305) 555-8901",
      manager: "Carlos Sanchez",
      employee: "Jennifer Lopez",
      isActive: false,
    },
    {
      id: 8,
      name: "Amit Verma",
      email: "amit.verma@gmail.com",
      branch: "Hyderabad-India",
      phone: "+91 99123 45678",
      manager: "Sneha Reddy",
      employee: "Rahul Sharma",
      isActive: true,
    },
  ];

  return clients;
};

const clientsData = generateClientsData();

const Clients = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 5;

  const filteredClients = clientsData.filter((client) => {
    const term = searchTerm.toLowerCase();

    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.phone.toLowerCase().includes(term) ||
      client.branch.toLowerCase().includes(term) ||
      client.manager.toLowerCase().includes(term) ||
      client.employee.toLowerCase().includes(term)
    );
  });

  // Pagination applied AFTER filtering
  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedClients = filteredClients.slice(startIndex, endIndex);

  return (
    <Layout title="Client">
      <div className="space-y-6 ">
        {/* Search Bar and Create Button */}
        <div className="text-end">
          <Button
            variant="outline"
            className="text-end text-primary border-primary hover:bg-primary hover:text-white bg-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Create Client
          </Button>
        </div>
        <div className="flex p-5 bg-white items-center rounded-xl gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2  -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search Clients with their names, email, manager, employee & Invoice no."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // reset to page 1 after search
              }}
              className="pl-10 rounded-xl h-12"
            />
          </div>
          <Button className="h-12 rounded-xl px-9">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        {/* Clients Table */}
        <div className="bg-card rounded-[30px]">
          <div className="p-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Clients</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm">Active</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-sm">Inactive</span>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="rounded-t-xl bg-[#E8F3FF] mx-4 border">
            <Table className="rounded-xl ">
              <TableHeader className=" rounded-xl">
                <TableRow className=" rounded-xl">
                  <TableHead className="w-16">S.No</TableHead>
                  <TableHead>Client Name</TableHead>
                  <TableHead>Branch Office</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-white">
                {paginatedClients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-muted-foreground text-lg"
                    >
                      Client doesn’t exist
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedClients.map((client, index) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">
                        {startIndex + index + 1}.
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <MinusCircle className="h-5 w-5" />
                          </Button>
                          <Link
                            to={`/clients/${client.id}`}
                            className="hover:underline"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{client.name}</span>
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  client.isActive
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                              />
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {client.email}
                            </div>
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell>{client.branch}</TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{client.manager}</TableCell>
                      <TableCell>{client.employee}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50"
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="p-4 flex items-center justify-end gap-6 ">
            <div className="text-sm text-muted-foreground">
              Rows Per Page: {itemsPerPage}
            </div>
            <div className="text-sm text-muted-foreground">
              {startIndex + 1}-{Math.min(endIndex, clientsData.length)} of{" "}
              {clientsData.length}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Clients;
