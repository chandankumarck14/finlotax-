import { Layout } from "@/components/Layout";

const Dashboard = () => {
  return (
    <Layout title="Dashboard">
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome to FINLOTAX</h2>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
