import { Layout } from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  const [period, setPeriod] = useState<"monthly" | "yearly" | "daily">("monthly");
  
  const tableHeaders = ["Date", "Customer ID", "Client Name", "Invoice No.", "Email", "Phone", "Handled By", "Location"];
  
  // Dummy invoice data
  const invoiceData = [
    {
      date: "2024-01-15",
      customerId: "C001",
      clientName: "Acme Corporation",
      invoiceNo: "INV-2024-001",
      email: "contact@acme.com",
      phone: "+1 (555) 123-4567",
      handledBy: "John Smith",
      location: "New York"
    },
    {
      date: "2024-01-18",
      customerId: "C002",
      clientName: "Tech Solutions Inc",
      invoiceNo: "INV-2024-002",
      email: "info@techsolutions.com",
      phone: "+1 (555) 234-5678",
      handledBy: "Sarah Johnson",
      location: "San Francisco"
    },
    {
      date: "2024-01-22",
      customerId: "C003",
      clientName: "Global Enterprises",
      invoiceNo: "INV-2024-003",
      email: "admin@globalent.com",
      phone: "+1 (555) 345-6789",
      handledBy: "Michael Brown",
      location: "Chicago"
    },
    {
      date: "2024-01-25",
      customerId: "C004",
      clientName: "Digital Marketing Pro",
      invoiceNo: "INV-2024-004",
      email: "hello@digitalpro.com",
      phone: "+1 (555) 456-7890",
      handledBy: "Emily Davis",
      location: "Los Angeles"
    },
    {
      date: "2024-02-02",
      customerId: "C005",
      clientName: "Innovation Labs",
      invoiceNo: "INV-2024-005",
      email: "contact@innovlabs.com",
      phone: "+1 (555) 567-8901",
      handledBy: "David Wilson",
      location: "Boston"
    },
    {
      date: "2024-02-08",
      customerId: "C006",
      clientName: "Premier Services LLC",
      invoiceNo: "INV-2024-006",
      email: "info@premierservices.com",
      phone: "+1 (555) 678-9012",
      handledBy: "Jessica Martinez",
      location: "Miami"
    },
    {
      date: "2024-02-14",
      customerId: "C007",
      clientName: "NextGen Solutions",
      invoiceNo: "INV-2024-007",
      email: "contact@nextgensol.com",
      phone: "+1 (555) 789-0123",
      handledBy: "Robert Taylor",
      location: "Seattle"
    },
    {
      date: "2024-02-20",
      customerId: "C008",
      clientName: "Bright Future Co",
      invoiceNo: "INV-2024-008",
      email: "hello@brightfuture.com",
      phone: "+1 (555) 890-1234",
      handledBy: "Amanda Clark",
      location: "Austin"
    }
  ];
  
  // Monthly data
  const monthlyData = [
    { month: "Jan", value: 200 },
    { month: "Feb", value: 350 },
    { month: "Mar", value: 320 },
    { month: "Apr", value: 450 },
    { month: "May", value: 500 },
    { month: "Jun", value: 550 },
    { month: "Jul", value: 600 },
    { month: "Aug", value: 680 },
    { month: "Sep", value: 780 },
    { month: "Oct", value: 850 },
    { month: "Nov", value: 920 },
    { month: "Dec", value: 1000 },
  ];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <div className="text-xs text-muted-foreground">Total Invoice</div>
          <div className="text-xs text-muted-foreground">{payload[0].payload.month}</div>
          <div className="text-lg font-bold text-foreground">{payload[0].value}</div>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Layout title="Reports">
      <div className="space-y-6">
        {/* Total Invoice Chart */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-foreground">Total Invoice / Contract</h2>
            <div className="flex gap-2">
              <Button 
                variant={period === "monthly" ? "outline" : "ghost"} 
                size="sm" 
                className="rounded-full"
                onClick={() => setPeriod("monthly")}
              >
                Monthly
              </Button>
              <Button 
                variant={period === "yearly" ? "outline" : "ghost"} 
                size="sm" 
                className="rounded-full"
                onClick={() => setPeriod("yearly")}
              >
                Yearly
              </Button>
              <Button 
                variant={period === "daily" ? "outline" : "ghost"} 
                size="sm" 
                className="rounded-full"
                onClick={() => setPeriod("daily")}
              >
                Daily
              </Button>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlyData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 76%, 56%)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="hsl(142, 76%, 56%)" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(142, 76%, 56%)"
                  strokeWidth={2}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Collection/Invoice Reports */}
        <Card className="py-6">
          <h2 className="text-lg px-6 font-semibold text-foreground mb-6">Collection/ Invoice Reports</h2>
          
          <div className="flex px-6 gap-4 mb-6">
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
              <div className="relative">
                <Input type="text" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
              <div className="relative">
                <Input type="text" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {tableHeaders.map((header) => (
                    <th key={header} className="text-left bg-[#E8F3FF] py-3 px-6 text-sm font-medium text-muted-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoiceData.map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-6 text-sm text-foreground">{row.date}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.customerId}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.clientName}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.invoiceNo}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.email}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.phone}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.handledBy}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Revenue by Associate (Employee) - First Table */}
        <Card className="py-6">
          <h2 className="text-lg font-semibold text-foreground px-6 mb-6">Revenue by Associate(Employee)</h2>
          
          <div className="flex px-6 gap-4 mb-6">
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
              <div className="relative">
                <Input type="text" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
              <div className="relative">
                <Input type="text" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">Employee</label>
              <div className="relative">
                <Input type="text" className="pr-10" />
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {tableHeaders.map((header) => (
                    <th key={header} className="text-left bg-[#E8F3FF] py-3 px-6 text-sm font-medium text-muted-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoiceData.map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-6 text-sm text-foreground">{row.date}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.customerId}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.clientName}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.invoiceNo}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.email}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.phone}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.handledBy}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Revenue by Associate (Employee) - Second Table */}
       <Card className="py-6">
          <h2 className="text-lg font-semibold text-foreground px-6 mb-6">Revenue by Associate(Employee)</h2>
          
          <div className="flex px-6 gap-4 mb-6">
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
              <div className="relative">
                <Input type="text" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div className="">
              <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
              <div className="relative">
                <Input type="text" className="pr-10" />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {tableHeaders.map((header) => (
                    <th key={header} className="text-left bg-[#E8F3FF] py-3 px-6 text-sm font-medium text-muted-foreground">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {invoiceData.map((row, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-6 text-sm text-foreground">{row.date}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.customerId}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.clientName}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.invoiceNo}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.email}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.phone}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.handledBy}</td>
                    <td className="py-3 px-6 text-sm text-foreground">{row.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </Layout>
  );
};

export default Reports;
