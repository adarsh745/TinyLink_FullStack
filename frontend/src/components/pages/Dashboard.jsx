import React, { useState } from "react";
import Header from "../Header.jsx";
import LinkForm from "../LinkForm.jsx";
import LinkTable from "../LinkTable.jsx";

export default function Dashboard() {
  const [refresh, setRefresh] = useState(false);
  return (
    <div>
      <Header />
      <LinkForm onCreated={() => setRefresh(!refresh)} />
      <LinkTable refresh={refresh} />
    </div>
  );
}
