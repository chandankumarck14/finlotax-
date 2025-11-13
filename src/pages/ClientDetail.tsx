import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Download,
  Printer,
  Mail,
  DollarSign,
  Edit,
  Trash,
  FileText,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const clientsDatabase = {
  "1": {
    id: 1,
    name: "Kiran Pasula",
    email: "kiranpasula@gmail.com",
    phone: "669-304-0733",
    branch: "Sunnyvale - USA",
    manager: "Prachi Babu",
    employee: "Ramya",
    address: "Lorem Ipsum",
  },
  "2": {
    id: 2,
    name: "Sudhakar Narayanappa",
    email: "sudhakar.n@gmail.com",
    phone: "+91 98765 43210",
    branch: "Bangalore - India",
    manager: "Rajashree Pawar",
    employee: "Amit Kumar",
    address: "123 MG Road, Bangalore",
  },
  "3": {
    id: 3,
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "+91 99887 76543",
    branch: "Mumbai - India",
    manager: "Vikram Singh",
    employee: "Neha Gupta",
    address: "456 Marine Drive, Mumbai",
  },
  "4": {
    id: 4,
    name: "John Anderson",
    email: "john.anderson@gmail.com",
    phone: "+1(212) 555-1234",
    branch: "New York - USA",
    manager: "Sarah Johnson",
    employee: "Michael Brown",
    address: "789 Broadway, New York",
  },
  "5": {
    id: 5,
    name: "Emily Chen",
    email: "emily.chen@gmail.com",
    phone: "+1(650) 555-4567",
    branch: "San Francisco - USA",
    manager: "David Wong",
    employee: "Lisa Martinez",
    address: "101 Market Street, San Francisco",
  },
  "6": {
    id: 6,
    name: "Rajesh Patel",
    email: "rajesh.patel@gmail.com",
    phone: "+91 98456 78901",
    branch: "Delhi - India",
    manager: "Anita Desai",
    employee: "Suresh Kumar",
    address: "234 Connaught Place, Delhi",
  },
  "7": {
    id: 7,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@gmail.com",
    phone: "+1(305) 555-8901",
    branch: "Miami - USA",
    manager: "Carlos Sanchez",
    employee: "Jennifer Lopez",
    address: "567 Ocean Drive, Miami",
  },
  "8": {
    id: 8,
    name: "Amit Verma",
    email: "amit.verma@gmail.com",
    phone: "+91 99123 45678",
    branch: "Hyderabad - India",
    manager: "Sneha Reddy",
    employee: "Rahul Sharma",
    address: "890 HITEC City, Hyderabad",
  },
};

// Generate more documents data for pagination
const generateDocumentsData = () => {
  const documents = [];
  for (let i = 1; i <= 25; i++) {
    documents.push({
      name: `2024_Returns_${i}`,
      date: "Sep 08 2025 09:28",
      type: "File Folder",
    });
  }
  return documents;
};

const documentsData = generateDocumentsData();

// Generate more invoice data for pagination
const generateInvoiceData = () => {
  const invoices = [];
  const colors = ["bg-green-50", "bg-orange-50", "bg-red-50"];
  for (let i = 1; i <= 25; i++) {
    invoices.push({
      invoiceNo: `INV-0000${300 + i}`,
      invoiceDate: "Sep 26 2025",
      billedBy: "Sudhakar Narayanappa",
      billedTo: "Kiran Pasula",
      grossTotal: "$650.00",
      netTotal: "$0",
      amountDue: "$0",
      lastUpdated: "Sep 27 2025 02:37",
      rowColor: colors[i % 3],
    });
  }
  return invoices;
};

const invoicesData = generateInvoiceData();

// Generate more notifications data for pagination
const generateNotificationsData = () => {
  const notifications = [];
  const icons = [UserCircle, FileText];
  const infos = [
    "Client Kiran Pasula has uploaded new documents",
    "INV-00000302 has been created",
  ];
  for (let i = 1; i <= 25; i++) {
    notifications.push({
      icon: icons[i % 2],
      info: infos[i % 2],
      date: "Sep 08 2025",
      time: "09:28",
    });
  }
  return notifications;
};

const notificationsData = generateNotificationsData();

const ClientDetail = () => {
  const { clientId } = useParams();
  const [documentFilter, setDocumentFilter] = useState("sent");
  const [invoicesPage, setInvoicesPage] = useState(1);
  const [documentsPage, setDocumentsPage] = useState(1);
  const [notificationsPage, setNotificationsPage] = useState(1);

  const itemsPerPage = 5;
  const client = clientsDatabase[clientId as keyof typeof clientsDatabase];

  const initialTab =
    localStorage.getItem(`clientTab_${clientId}`) || "personal";

  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem(`clientTab_${clientId}`, value);
  };

  // Pagination helpers
  const getPaginatedData = (data: any[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (dataLength: number) =>
    Math.ceil(dataLength / itemsPerPage);

  const paginatedInvoices = getPaginatedData(invoicesData, invoicesPage);
  const paginatedDocuments = getPaginatedData(documentsData, documentsPage);
  const paginatedNotifications = getPaginatedData(
    notificationsData,
    notificationsPage
  );

  const invoicesTotalPages = getTotalPages(invoicesData.length);
  const documentsTotalPages = getTotalPages(documentsData.length);
  const notificationsTotalPages = getTotalPages(notificationsData.length);

  if (!client) {
    return (
      <Layout title="Client Not Found">
        <div className="p-6">Client not found</div>
      </Layout>
    );
  }

  return (
    <Layout title="Client">
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xl text-muted-foreground">
          <Link
            to="/clients/list"
            className="hover:text-foreground transition-colors"
          >
            Client
          </Link>
          <span>›</span>
          <span className="text-foreground font-bold">{client.name}</span>
        </div>

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full rounded-xl bg-[#EAE9E9] p-4"
        >
          <TabsList className=" bg-[#EAE9E9] px-6 h-auto">
            <TabsTrigger value="personal" className="text-md">
              Personal Details
            </TabsTrigger>
            <TabsTrigger value="invoices" className="text-md">
              Invoices
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-md">
              Documents
            </TabsTrigger>
            <TabsTrigger value="signature" className="text-md">
              Signature
            </TabsTrigger>
            <TabsTrigger value="notification" className="text-md">
              Notification
            </TabsTrigger>
          </TabsList>

          {/* Personal Details Tab */}
          <TabsContent value="personal" className="">
            <div className="bg-card rounded-lg p-8 space-y-6">
              <div className="grid grid-cols-[150px_1fr] gap-y-6">
                <span className="font-semibold">Name:</span>
                <span>{client.name}</span>

                <span className="font-semibold">Phone:</span>
                <span>{client.phone}</span>

                <span className="font-semibold">Email:</span>
                <span>{client.email}</span>

                <span className="font-semibold">Branch Office:</span>
                <span>{client.branch}</span>

                <span className="font-semibold">Manager:</span>
                <span>{client.manager}</span>

                <span className="font-semibold">Employee:</span>
                <span>{client.employee}</span>

                <span className="font-semibold">Address:</span>
                <span>{client.address}</span>
              </div>
            </div>
          </TabsContent>

          {/* Invoices Tab */}
          <TabsContent value="invoices" className="p-5 rounded-xl bg-white">
            <div className="bg-card rounded-lg border overflow-hidden">
              <Table className="">
                <TableHeader>
                  <TableRow className="bg-[#E8F3FF]">
                    <TableHead>Invoice No.</TableHead>
                    <TableHead>Invoice Date</TableHead>
                    <TableHead>Billed By</TableHead>
                    <TableHead>Billed To</TableHead>
                    <TableHead>Gross Total</TableHead>
                    <TableHead>Net Total</TableHead>
                    <TableHead>Amount Due</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedInvoices.map((invoice, index) => (
                    <TableRow
                      key={index}
                      className={`mb-3 ${invoice.rowColor}`}
                    >
                      <TableCell className="font-medium mb">
                        {invoice.invoiceNo}
                      </TableCell>
                      <TableCell>{invoice.invoiceDate}</TableCell>
                      <TableCell>{invoice.billedBy}</TableCell>
                      <TableCell>{invoice.billedTo}</TableCell>
                      <TableCell>{invoice.grossTotal}</TableCell>
                      <TableCell>{invoice.netTotal}</TableCell>
                      <TableCell>{invoice.amountDue}</TableCell>
                      <TableCell>{invoice.lastUpdated}</TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Printer className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Mail className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <DollarSign className="h-4 w-4 text-yellow-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="p-4 flex items-center justify-end gap-6 border-t">
                <div className="text-sm text-muted-foreground">
                  Rows Per Page: {itemsPerPage}
                </div>
                <div className="text-sm text-muted-foreground">
                  {(invoicesPage - 1) * itemsPerPage + 1}-
                  {Math.min(invoicesPage * itemsPerPage, invoicesData.length)}{" "}
                  of {invoicesData.length}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={invoicesPage === 1}
                    onClick={() => setInvoicesPage(1)}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={invoicesPage === 1}
                    onClick={() => setInvoicesPage(invoicesPage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={invoicesPage === invoicesTotalPages}
                    onClick={() => setInvoicesPage(invoicesPage + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={invoicesPage === invoicesTotalPages}
                    onClick={() => setInvoicesPage(invoicesTotalPages)}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="p-5 rounded-xl bg-white">
            <div className="bg-card rounded-lg overflow-hidden">
              {/* Filter Buttons */}
              <div className="pb-4 border-b flex gap-2">
                <Button
                  variant={documentFilter === "sent" ? "default" : "outline"}
                  onClick={() => setDocumentFilter("sent")}
                  className="rounded-full"
                >
                  Sent
                </Button>
                <Button
                  variant={
                    documentFilter === "received" ? "default" : "outline"
                  }
                  onClick={() => setDocumentFilter("received")}
                  className="rounded-full"
                >
                  Received
                </Button>
                <Button
                  variant={documentFilter === "office" ? "default" : "outline"}
                  onClick={() => setDocumentFilter("office")}
                  className="rounded-full"
                >
                  Office Purpose
                </Button>
              </div>

              <Table className="border ">
                <TableHeader className="">
                  <TableRow className="bg-[#E8F3FF] rounded-lg">
                    <TableHead>Document</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>File Type</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedDocuments.map((doc, index) => (
                    <TableRow key={index}>
                      <TableCell className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        {doc.name}
                      </TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="p-4 flex items-center justify-end gap-6 border-t">
                <div className="text-sm text-muted-foreground">
                  Rows Per Page: {itemsPerPage}
                </div>
                <div className="text-sm text-muted-foreground">
                  {(documentsPage - 1) * itemsPerPage + 1}-
                  {Math.min(documentsPage * itemsPerPage, documentsData.length)}{" "}
                  of {documentsData.length}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={documentsPage === 1}
                    onClick={() => setDocumentsPage(1)}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={documentsPage === 1}
                    onClick={() => setDocumentsPage(documentsPage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={documentsPage === documentsTotalPages}
                    onClick={() => setDocumentsPage(documentsPage + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={documentsPage === documentsTotalPages}
                    onClick={() => setDocumentsPage(documentsTotalPages)}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Signature Tab */}
          <TabsContent value="signature" className="mt-6"></TabsContent>

          {/* Notification Tab */}
          <TabsContent value="notification" className="p-6 rounded-xl bg-white">
            <div className="bg-card rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#E8F3FF]">
                    <TableHead>Info</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedNotifications.map((notification, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <notification.icon className="h-5 w-5 text-muted-foreground" />
                          <span>{notification.info}</span>
                        </div>
                      </TableCell>
                      <TableCell>{notification.date}</TableCell>
                      <TableCell>{notification.time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="p-4 flex items-center justify-end gap-6 border-t">
                <div className="text-sm text-muted-foreground">
                  Rows Per Page: {itemsPerPage}
                </div>
                <div className="text-sm text-muted-foreground">
                  {(notificationsPage - 1) * itemsPerPage + 1}-
                  {Math.min(
                    notificationsPage * itemsPerPage,
                    notificationsData.length
                  )}{" "}
                  of {notificationsData.length}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={notificationsPage === 1}
                    onClick={() => setNotificationsPage(1)}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={notificationsPage === 1}
                    onClick={() => setNotificationsPage(notificationsPage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={notificationsPage === notificationsTotalPages}
                    onClick={() => setNotificationsPage(notificationsPage + 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    disabled={notificationsPage === notificationsTotalPages}
                    onClick={() =>
                      setNotificationsPage(notificationsTotalPages)
                    }
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default ClientDetail;
