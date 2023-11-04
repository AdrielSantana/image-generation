import GeneralLayout from "@/presentation/layouts/GeneralLayout";
import React from "react";

const MakeGeneralLayout = ({ children }: { children: React.ReactNode }) => {
  return <GeneralLayout>{children}</GeneralLayout>;
};

export default MakeGeneralLayout;
