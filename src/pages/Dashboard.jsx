import DashboardFilter from "../features/dashboard/DashboardFilter";
import DashboardLayOut from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <DashboardFilter/>
      </Row>
      <DashboardLayOut/>
    </>
  );
}

export default Dashboard;
